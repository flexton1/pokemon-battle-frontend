import React from "react";


//@ts-ignore
export default function Item({ row, index }) {
    return (
      <tr>
      <td>{index + 1}</td>
      <td>{row.name}</td>
      <td className="item__score">{row.score}</td>
    </tr>
    
    );
  }
  