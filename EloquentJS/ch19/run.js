const startState = {
  tool: "draw",
  color: "#000000",
  picture: Picture.empty(80, 50, "#f0f0f0"),
  done: [],
  doneAt: 0
};

const baseTools = {draw, rectangle, fill, pick, circle};

const baseControls = [
  ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton
];

function startPixelEditor({state = startState,
                           tools = baseTools,
                           controls = baseControls}) {
  let app = new PictureEditor(state, {
    tools,
    controls,
    dispatch(action) {
      state = historyUpdateState(state, action);
      app.syncState(state);
    }
  });
  return app.dom;
}
