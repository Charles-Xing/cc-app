import { Shape } from "react-konva";
import { useStoreSelector } from "@/store/hooks";
import { dashedWhiteLine } from "../../store/reducer/courtSizeSlice";
import { useContext } from "react";
import { START_POINT } from "@/constants/courtSize";

function BorderDimensionLine() {
  const { courtAreaYLength, borderLength } = useStoreSelector((state) => state.courtSize);
  const startPoint = useContext(START_POINT);
  const startPointX = startPoint.X - borderLength;
  const startPointY = startPoint.Y - borderLength;
  const courtHeight = courtAreaYLength;

  return (
    <>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(startPointX, startPoint.Y);
          context.lineTo(startPoint.X, startPoint.Y);
          context.lineTo(startPoint.X, startPointY);
          context.fillStrokeShape(shape);
        }}
        fill="transparent"
        stroke="white"
        strokeWidth={dashedWhiteLine}
        dash={[60, 60]}
      />
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(startPointX, startPoint.Y + courtHeight);
          context.lineTo(startPoint.X, startPoint.Y + courtHeight);
          context.lineTo(startPoint.X, startPoint.Y + courtHeight + borderLength);
          context.fillStrokeShape(shape);
        }}
        fill="transparent"
        stroke="white"
        strokeWidth={dashedWhiteLine}
        dash={[60, 60]}
      />
    </>
  );
}

export default BorderDimensionLine;
