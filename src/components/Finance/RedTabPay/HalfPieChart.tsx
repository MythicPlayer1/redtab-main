//@ts-nocheck

import { Chart as ChartJs, ArcElement, Tooltip, Chart, layouts } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip);

const HalfPieChart = () => {
  Chart.defaults.font.family = "Poppins";

  const data = {
    labels: ["Go", "Python", "Kotlin", "JavaScript", "R", "Swift"],
    datasets: [
      {
        label: "# of Votes",
        data: [5, 5, 5],
        backgroundColor: ["#475467", "#AEBACB", "#EAECF0"],
        borderColor: ["rgba(255,255,255)", "rgba(255,255,255)", "rgba(255,255,255)"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: "85%",
      },
    ],
  };

  const guageText = {
    id: "guageText",
    beforeDatasetsDraw(chart: Chart) {
      const { ctx } = chart;
      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;
      ctx.save();
      ctx.font = "18px bold poppins";
      ctx.fillStyle = "#1D2939";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText("white", xCenter, yCenter - 60);
      ctx.font = "50px bold poppins";
      ctx.fillText("8", xCenter, yCenter);

      ctx.restore();
    },
  };

  const doughnutPointer = {
    id: "doughnutPointer",
    afterDatasetsDraw(chart: Chart) {
      const { ctx, data } = chart;

      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      // console.log(centerX, centerY);
      const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
      const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
      const doughNutThickness = outerRadius - innerRadius;
      const smallRadius = (doughNutThickness + 5) / 1;
      const angle = Math.PI / 180;

      // calucutate the total value for the chart
      function sumArray(array) {
        return array.reduce((acc, val) => acc + val, 0);
      }
      const pointerValue = 42; // The value should be 0-9
      const dataPointer = data.datasets[0].data.map((value) => value);
      const totalSum = sumArray(dataPointer);
      const pointerValuePerCentage = (pointerValue / totalSum) * 100;
      const targetPointer = (pointerValue / totalSum) * 180 - 90;
      ctx.save();
      ctx.translate(centerX, centerY);
      const targetAngle = (pointerValue / totalSum) * Math.PI - Math.PI / 2; // Assuming semi-circle is half of 180 degrees
      ctx.rotate(targetAngle); // Rotate to the target angle

      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.strokeStyle = "white"; // Border color
      ctx.lineWidth = 5; // Border width
      ctx.roundRect(-25, -outerRadius, doughNutThickness + 5, doughNutThickness + 5, 1000);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      //       const additionalCircleRadius = innerRadius - 20; // Example: half the radius of the first circle
      //       ctx.beginPath();
      //       ctx.strokeStyle = "#D0D7Dd";
      //       ctx.lineWidth = 1;
      //       ctx.arc(centerX, centerY, additionalCircleRadius, -Math.PI, 0); // Drawing the second circle // Example: a different fill color for differentiation
      //       ctx.stroke();
    },
  };
  return (
    <>
      <div className="mt-10 h-60">
        <Doughnut data={data} plugins={[guageText, doughnutPointer]} />
      </div>
    </>
  );
};

export default HalfPieChart;
