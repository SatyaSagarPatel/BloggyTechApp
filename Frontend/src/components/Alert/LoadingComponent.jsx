// import ReactLoading from "react-loading";
// function LoadingComponent() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <ReactLoading type="spin" color="green" />
//     </div>
//   );
// }
// export default LoadingComponent;
function LoadingComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingComponent;
