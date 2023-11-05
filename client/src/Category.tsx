import { Card } from "antd";
import { useState } from "react";
const { Meta } = Card;

export default function Category({ getImg, cat, onClick }: any) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Card
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
      style={{
        marginLeft: 30,
        width: 250,
        cursor: "pointer",
        padding: `${isHover ? 2 : 0}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
      cover={
        <img style={{ marginTop: 20 }} alt="example" src={getImg(cat?.label)} height={100} width={100} />
      }
    >
      <Meta title={cat?.label} />
    </Card>
  );
}
