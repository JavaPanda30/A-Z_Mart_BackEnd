import { ThreeDots } from "react-loading-icons";
import "./Loading.css";
export const Loading = () => {
  //   const para = document.getElementById("loadingpara");
  const val = "Loading... Please Wait";
  //   let b = -1;
  // no need as there is very less time to show any animation during loading
  //   const aman = setInterval(() => {
    //     clearTimeout();
    //     setTimeout(() => {
  //       if(para)
  //       para.innerHTML += val[b % val.length];
  //     }, 8);
  //     b += 1;
  //     if (para && b === val.length) {
  //       para.innerText = "";
  //       b = 0;
  //     }
  //   }, 180);

  return (
    <div className="loading-screen">
      <ThreeDots stroke="rgb(259, 167, 90)" speed={1.2} strokeWidth={20} />
      <p id="loadingpara">{val}</p>
    </div>
  );
};
