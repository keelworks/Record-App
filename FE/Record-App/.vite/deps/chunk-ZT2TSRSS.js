import {
  capitalize_default,
  init_capitalize
} from "./chunk-MX7ZM24B.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_composeClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_styled,
  init_useThemeProps2 as init_useThemeProps,
  styled_default,
  useThemeProps2 as useThemeProps
} from "./chunk-E4RKQW5N.js";
import {
  require_jsx_runtime
} from "./chunk-4L44OEO5.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  init_extends,
  init_objectWithoutPropertiesLoose
} from "./chunk-4HJ7CV5Z.js";
import {
  clsx_default,
  init_clsx
} from "./chunk-Q27KEZHG.js";
import {
  require_prop_types
} from "./chunk-ZM6LQ52J.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/material/StepConnector/StepConnector.js
init_objectWithoutPropertiesLoose();
init_extends();
var React3 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_capitalize();
init_styled();
init_useThemeProps();

// node_modules/@mui/material/Stepper/StepperContext.js
var React = __toESM(require_react());
var StepperContext = React.createContext({});
if (true) {
  StepperContext.displayName = "StepperContext";
}
function useStepperContext() {
  return React.useContext(StepperContext);
}
var StepperContext_default = StepperContext;

// node_modules/@mui/material/Step/StepContext.js
var React2 = __toESM(require_react());
var StepContext = React2.createContext({});
if (true) {
  StepContext.displayName = "StepContext";
}
function useStepContext() {
  return React2.useContext(StepContext);
}
var StepContext_default = StepContext;

// node_modules/@mui/material/StepConnector/stepConnectorClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getStepConnectorUtilityClass(slot) {
  return generateUtilityClass("MuiStepConnector", slot);
}
var stepConnectorClasses = generateUtilityClasses("MuiStepConnector", ["root", "horizontal", "vertical", "alternativeLabel", "active", "completed", "disabled", "line", "lineHorizontal", "lineVertical"]);
var stepConnectorClasses_default = stepConnectorClasses;

// node_modules/@mui/material/StepConnector/StepConnector.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["className"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    orientation,
    alternativeLabel,
    active,
    completed,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", orientation, alternativeLabel && "alternativeLabel", active && "active", completed && "completed", disabled && "disabled"],
    line: ["line", `line${capitalize_default(orientation)}`]
  };
  return composeClasses(slots, getStepConnectorUtilityClass, classes);
};
var StepConnectorRoot = styled_default("div", {
  name: "MuiStepConnector",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.orientation], ownerState.alternativeLabel && styles.alternativeLabel, ownerState.completed && styles.completed];
  }
})(({
  ownerState
}) => _extends({
  flex: "1 1 auto"
}, ownerState.orientation === "vertical" && {
  marginLeft: 12
  // half icon
}, ownerState.alternativeLabel && {
  position: "absolute",
  top: 8 + 4,
  left: "calc(-50% + 20px)",
  right: "calc(50% + 20px)"
}));
var StepConnectorLine = styled_default("span", {
  name: "MuiStepConnector",
  slot: "Line",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.line, styles[`line${capitalize_default(ownerState.orientation)}`]];
  }
})(({
  ownerState,
  theme
}) => {
  const borderColor = theme.palette.mode === "light" ? theme.palette.grey[400] : theme.palette.grey[600];
  return _extends({
    display: "block",
    borderColor: theme.vars ? theme.vars.palette.StepConnector.border : borderColor
  }, ownerState.orientation === "horizontal" && {
    borderTopStyle: "solid",
    borderTopWidth: 1
  }, ownerState.orientation === "vertical" && {
    borderLeftStyle: "solid",
    borderLeftWidth: 1,
    minHeight: 24
  });
});
var StepConnector = React3.forwardRef(function StepConnector2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiStepConnector"
  });
  const {
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    alternativeLabel,
    orientation = "horizontal"
  } = React3.useContext(StepperContext_default);
  const {
    active,
    disabled,
    completed
  } = React3.useContext(StepContext_default);
  const ownerState = _extends({}, props, {
    alternativeLabel,
    orientation,
    active,
    completed,
    disabled
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(StepConnectorRoot, _extends({
    className: clsx_default(classes.root, className),
    ref,
    ownerState
  }, other, {
    children: (0, import_jsx_runtime.jsx)(StepConnectorLine, {
      className: classes.line,
      ownerState
    })
  }));
});
true ? StepConnector.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var StepConnector_default = StepConnector;

export {
  useStepperContext,
  StepperContext_default,
  useStepContext,
  StepContext_default,
  getStepConnectorUtilityClass,
  stepConnectorClasses_default,
  StepConnector_default
};
//# sourceMappingURL=chunk-ZT2TSRSS.js.map
