import cors from "@fastify/cors";
import { formateDate } from "./utils";
const fastify = require("fastify");
const app = fastify();
const users = require("./Database/UserSchema");
const orderDB = require("./Database/OrderSchema");
const mongoosed = require("mongoose");

app.register(cors);

try {
  mongoosed.connect("mongodb://localhost/devDB");
} catch (e) {
  console.error(e);
}

app.get("/get-data", async (request: any, reply: any) => {
  try {
    const allOrders = await orderDB.find({}).sort({ createdAt: -1 });
    reply.send(allOrders);
  } catch (err) {
    console.log(err);
  }
});

app.get("/most-selling-unit/:customDate", async (request: any, reply: any) => {
  try {
    const { customDate } = request.params;
    const targetDate = new Date(customDate);
    const formatedDate = formateDate(targetDate);
    const customAggregate: any = [
      { $unwind: "$orderDetails" },
      {
        $group: {
          _id: "$orderDetails.itemName",
          itemCount: { $sum: "$orderDetails.itemQuantity" },
        },
      },
      { $sort: { itemCount: -1 } },
      { $limit: 1 },
    ];
    if (customDate !== "all") {
      customAggregate.unshift({
        $match: {
          createdAt: {
            $gt: formatedDate.startDate,
            $lt: formatedDate.endDate,
          },
        },
      });
    }
    const mostSellingUnit = await orderDB.aggregate(customAggregate);
    reply.send(mostSellingUnit[0]);
  } catch (err) {}
});

app.get("/total-sale-by-date/:id", async (request: any, reply: any) => {
  const { id } = request.params;
  const targetDate = new Date(id);
  const formatedDate = formateDate(targetDate);
  const customAggregate: any = [
    {
      $unwind: "$orderDetails",
    },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: "$orderDetails.itemPrice" },
      },
    },
    {
      $project: { totalPrice: 1, _id: 0 },
    },
  ];
  if (id !== "all") {
    customAggregate.unshift({
      $match: {
        createdAt: {
          $gt: formatedDate.startDate,
          $lt: formatedDate.endDate,
        },
      },
    });
  }
  const results = await orderDB.aggregate(customAggregate);
  reply.send(results[0]);
});

app.get("/date/:id", async (request: any, reply: any) => {
  try {
    const targetDate = new Date(request.params.id);
    const formatedDate = formateDate(targetDate);

    const order = await orderDB.find({
      createdAt: {
        $gt: formatedDate.startDate,
        $lt: formatedDate.endDate,
      },
    });
    reply.send(order);
  } catch (err) {
    console.log(err);
  }
});

app.get("/total-items-sold/:id", async (request: any, reply: any) => {
  try {
    const targetDate = new Date(request.params.id);
    const formatedDate = formateDate(targetDate);

    const customAggregate: any = [
      {
        $group: {
          _id: null,
          totalCount: { $sum: { $size: "$orderDetails" } },
        },
      },
      {
        $project: {
          totalCount: 1,
          _id: 0,
        },
      },
    ];

    if (request.params.id !== "all") {
      customAggregate.unshift({
        $match: {
          createdAt: {
            $gt: formatedDate.startDate,
            $lt: formatedDate.endDate,
          },
        },
      });
    }

    const finalData = await orderDB.aggregate(customAggregate);

    reply.send(finalData[0]);
  } catch (err) {
    console.log(err);
  }
});

app.post("/auth/register", async (request: any, reply: any) => {
  try {
    const exists = await users.findOne({ email: request.body.email });
    if (exists) return reply.send({ msg: "Email already registered" });
    const newUser = await users.create(request.body);
    reply.send(newUser);
  } catch (err) {
    console.log(err);
  }
});

app.post("/auth/login", async (request: any, reply: any) => {
  try {
    const emailFound = await users.findOne({ email: request.body.email });
    if (!emailFound) return reply.send({ msg: "Email not found" });
    if (request.body.password === emailFound.password) {
      reply.send({
        id: emailFound._id,
        name: emailFound.name,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/add-order", async (request: any, reply: any) => {
  try {
    const { serverName, tableNo, order } = request.body;
    const newOrder = new orderDB();
    newOrder.serverName = serverName;
    newOrder.tableNo = tableNo;
    let finalOrder: any = [];
    for (let i = 0; i < order.length; i++) {
      let eachOrder = order[i].itemData;
      console.log(eachOrder);
      let orderObj = {
        itemName: eachOrder.label,
        itemValue: eachOrder.value,
        itemCategory: eachOrder.category,
        itemPrice: eachOrder.price,
        itemQuantity: order[i].itemQuantity,
        itemSize: order[i].size,
      };
      finalOrder.push(orderObj);
    }

    newOrder.orderDetails = finalOrder;
    let x = await newOrder.save();
    reply.send(x);
  } catch (err) {
    console.log(err);
  }
});

const start = async () => {
  try {
    await app.listen({ port: 5001 });
  } catch (err) {
    app.log.error("err is:", err);
  }
};
start();

console.log("hello");
