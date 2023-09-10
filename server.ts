import cors from "@fastify/cors";
import { formateDate } from "./utils";
const fastify = require("fastify");
const app = fastify();
const users = require("./Database/UserSchema");
const orderDB = require("./Database/OrderSchema");
const mongoosed = require("mongoose");

app.register(cors);

try {
  mongoosed.connect("mongodb://127.0.0.1/blog");
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

const latestRecord = async () => {
  return await orderDB
    .find({})
    .sort({ orderNumber: -1 })
    .limit(1)
    .select("orderNumber");
};

app.get("/latest-order", async (request: any, reply: any) => {
  return await latestRecord();
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
      $project: {
        totalPrice: {
          $multiply: ["$orderDetails.itemPrice", "$orderDetails.itemQuantity"],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: "$totalPrice" },
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

app.get("/date/:id/:page", async (request: any, reply: any) => {
  try {
    if (request.params.id === "all") {
      const totalCount = await orderDB.countDocuments({});
      const order = await orderDB
        .find({})
        .sort({ createdAt: -1 })
        .limit(10)
        .skip((request.params.page - 1) * 10);
      return reply.send({ order, totalCount });
    }
    const targetDate = new Date(request.params.id);
    const formatedDate = formateDate(targetDate);
    const totalCount = await orderDB.countDocuments({
      createdAt: {
        $gt: formatedDate.startDate,
        $lt: formatedDate.endDate,
      },
    });

    const order = await orderDB
      .find({
        createdAt: {
          $gt: formatedDate.startDate,
          $lt: formatedDate.endDate,
        },
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .skip((request.params.page - 1) * 10);
    reply.send({ order, totalCount });
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
    const onumber = await latestRecord();
    const orderNumber = onumber.length ? onumber[0]?.orderNumber + 1 : 1;
    console.log(onumber);
    console.log(orderNumber, "zzzzz");
    const newOrder = new orderDB();
    newOrder.serverName = serverName;
    newOrder.tableNo = tableNo;
    newOrder.orderNumber = orderNumber;
    let finalOrder: any = [];
    for (let i = 0; i < order.length; i++) {
      let eachOrder = order[i].itemData;
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
    const orderCreated = await newOrder.save();
    reply.send(orderCreated);
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
