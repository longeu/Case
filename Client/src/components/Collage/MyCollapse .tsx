import { Collapse } from "react-bootstrap";
interface MyCollapseProps {
  value?: string;
  isShow?: boolean;
}
function MyCollapse(props: MyCollapseProps) {
  return (
    <>
      <Collapse in={props.isShow} dimension="height">
        <div id="example-collapse-text">
          {" "}
          <div className="card border ">
            <div className="card-body text-left">{props.value}</div>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default MyCollapse;
