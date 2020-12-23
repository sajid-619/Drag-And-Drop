import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

//Redux connect
import { connect } from "react-redux";
import {
  moveleftCard,
  rmoveleftCard,
} from "../redux/leftcolumn/LeftColumnAction";

import { addRightCard } from "../redux/rightcolumn/RightColumnAction";

const MovableItem = ({
  id,
  index,
  image,
  currentColumnName,
  moveleftCard,
  addRightCard,
  rmoveleftCard,
  load_left_column,
}) => {
  const ref = useRef(null);

  let dragIndex = null;
  let hoverIndex = null;

  const [, drop] = useDrop({
    accept: "Our first type",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      dragIndex = item.index;
      hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveleftCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { index, id, currentColumnName, type: "Our first type" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      const images = load_left_column.images.filter(
        (img) => img.char_id === item.id
      );

      if (dropResult) {
        const { name } = dropResult;

        switch (name) {
          case "In Progress":
            rmoveleftCard(images);
            addRightCard(images);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="movable-item"
      style={{ opacity, marginBlock: 40 }}
    >
      <img
        src={image}
        style={{
          height: "140px",
          width: "140px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        alt=""
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    load_left_column: state.LoadleftColumnImageState,
    load_right_column: state.LoadrightColumnImageState,
  };
};

export default connect(mapStateToProps, {
  addRightCard,
  moveleftCard,
  rmoveleftCard,
})(MovableItem);
