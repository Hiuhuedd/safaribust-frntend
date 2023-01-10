
export const History = [
  {
    name: "Date",
    selector: (row) => new Date(row.createdAt).toLocaleString(),
    width: "200px",
  },
  {
    name: "Game ID",
    selector: (row) => row._id,
    width: "230px",
  },
  {
    name: "Result",
    selector: (row) =>
      row.win ? (
        <span style={{ color: "green", fontWeight: 700 }}>Won</span>
      ) : (
        <span style={{ color: "red", fontWeight: 700 }}>Lost</span>
      ),
    width: "100px",
  },
  {
    name: "Type",
    selector: (row) => "auto",
    width: "120px",
  },
  {
    name: "Round",
    selector: (row) => row.round,
    width: "100px",
  },
   {
    name: "Won/Lost",
    selector: (row) => parseFloat(parseFloat(row.amount).toFixed(2)+parseFloat(row.tax)).toFixed(2),
    width: "100px",
  },
  {
    name: "Bet Amount",
    selector: (row) => row.betAmount,
    width: "120px",
  },
  {
    name: "Crash Point",
    selector: (row) => row.point,
    width: "120px",
  },
  {
    name: "Bust Level",
    selector: (row) => row.point,
    width: "120px",
  },
  {
    name: "Tax",
    selector: (row) => parseFloat(row.tax).toFixed(2),
    width: "120px",
  },
];
