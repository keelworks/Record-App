"use client";
import "./chunk-4B77AAQV.js";
import {
  CircularProgress_default,
  useButton
} from "./chunk-DDSGMUNA.js";
import "./chunk-MHSUPVIZ.js";
import "./chunk-UHINIFCJ.js";
import {
  useSlot
} from "./chunk-6FLHISCD.js";
import {
  capitalize,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  styled_default,
  useForkRef,
  useThemeProps
} from "./chunk-FNE6UPPL.js";
import {
  require_jsx_runtime
} from "./chunk-4L44OEO5.js";
import "./chunk-WX5Z3QDG.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  init_extends,
  init_objectWithoutPropertiesLoose
} from "./chunk-4HJ7CV5Z.js";
import "./chunk-Q27KEZHG.js";
import {
  require_prop_types
} from "./chunk-ZM6LQ52J.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/joy/Button/Button.js
init_objectWithoutPropertiesLoose();
init_extends();
var React3 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/joy/Button/buttonClasses.js
function getButtonUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}
var buttonClasses = generateUtilityClasses("MuiButton", ["root", "colorPrimary", "colorNeutral", "colorDanger", "colorSuccess", "colorWarning", "colorContext", "variantPlain", "variantOutlined", "variantSoft", "variantSolid", "focusVisible", "disabled", "sizeSm", "sizeMd", "sizeLg", "fullWidth", "startDecorator", "endDecorator", "loading", "loadingIndicatorCenter"]);
var buttonClasses_default = buttonClasses;

// node_modules/@mui/joy/ButtonGroup/ButtonGroupContext.js
var React = __toESM(require_react());
var ButtonGroupContext = React.createContext({});
if (true) {
  ButtonGroupContext.displayName = "ButtonGroupContext";
}
var ButtonGroupContext_default = ButtonGroupContext;

// node_modules/@mui/joy/ToggleButtonGroup/ToggleButtonGroupContext.js
var React2 = __toESM(require_react());
var ToggleButtonGroupContext = React2.createContext(void 0);
if (true) {
  ToggleButtonGroupContext.displayName = "ToggleButtonGroupContext";
}
var ToggleButtonGroupContext_default = ToggleButtonGroupContext;

// node_modules/@mui/joy/Button/Button.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children", "action", "color", "variant", "size", "fullWidth", "startDecorator", "endDecorator", "loading", "loadingPosition", "loadingIndicator", "disabled", "component", "slots", "slotProps"];
var useUtilityClasses = (ownerState) => {
  const {
    color,
    disabled,
    focusVisible,
    focusVisibleClassName,
    fullWidth,
    size,
    variant,
    loading
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", fullWidth && "fullWidth", variant && `variant${capitalize(variant)}`, color && `color${capitalize(color)}`, size && `size${capitalize(size)}`, loading && "loading"],
    startDecorator: ["startDecorator"],
    endDecorator: ["endDecorator"],
    loadingIndicatorCenter: ["loadingIndicatorCenter"]
  };
  const composedClasses = composeClasses(slots, getButtonUtilityClass, {});
  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
};
var ButtonStartDecorator = styled_default("span", {
  name: "JoyButton",
  slot: "StartDecorator",
  overridesResolver: (props, styles) => styles.startDecorator
})({
  "--Icon-margin": "0 0 0 calc(var(--Button-gap) / -2)",
  "--CircularProgress-margin": "0 0 0 calc(var(--Button-gap) / -2)",
  display: "inherit",
  marginRight: "var(--Button-gap)"
});
var ButtonEndDecorator = styled_default("span", {
  name: "JoyButton",
  slot: "EndDecorator",
  overridesResolver: (props, styles) => styles.endDecorator
})({
  "--Icon-margin": "0 calc(var(--Button-gap) / -2) 0 0",
  "--CircularProgress-margin": "0 calc(var(--Button-gap) / -2) 0 0",
  display: "inherit",
  marginLeft: "var(--Button-gap)"
});
var ButtonLoadingCenter = styled_default("span", {
  name: "JoyButton",
  slot: "LoadingCenter",
  overridesResolver: (props, styles) => styles.loadingIndicatorCenter
})(({
  theme,
  ownerState
}) => {
  var _a, _b, _c, _d;
  return _extends({
    display: "inherit",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    color: (_b = (_a = theme.variants[ownerState.variant]) == null ? void 0 : _a[ownerState.color]) == null ? void 0 : _b.color
  }, ownerState.disabled && {
    color: (_d = (_c = theme.variants[`${ownerState.variant}Disabled`]) == null ? void 0 : _c[ownerState.color]) == null ? void 0 : _d.color
  });
});
var getButtonStyles = ({
  theme,
  ownerState
}) => {
  var _a, _b, _c, _d;
  return [_extends({
    "--Icon-margin": "initial",
    // reset the icon's margin.
    "--Icon-color": ownerState.color !== "neutral" || ownerState.variant === "solid" ? "currentColor" : theme.vars.palette.text.icon
  }, ownerState.size === "sm" && {
    "--Icon-fontSize": theme.vars.fontSize.lg,
    "--CircularProgress-size": "20px",
    // must be `px` unit, otherwise the CircularProgress is broken in Safari
    "--CircularProgress-thickness": "2px",
    "--Button-gap": "0.375rem",
    minHeight: "var(--Button-minHeight, 2rem)",
    fontSize: theme.vars.fontSize.sm,
    paddingBlock: "var(--Button-paddingBlock, 0.25rem)",
    paddingInline: "0.75rem"
  }, ownerState.size === "md" && {
    "--Icon-fontSize": theme.vars.fontSize.xl,
    "--CircularProgress-size": "20px",
    // must be `px` unit, otherwise the CircularProgress is broken in Safari
    "--CircularProgress-thickness": "2px",
    "--Button-gap": "0.5rem",
    minHeight: "var(--Button-minHeight, 2.25rem)",
    // use min-height instead of height to make the button resilient to its content
    fontSize: theme.vars.fontSize.sm,
    // internal --Button-paddingBlock is used to control the padding-block of the button from the outside, for example as a decorator of an Input
    paddingBlock: "var(--Button-paddingBlock, 0.375rem)",
    // the padding-block act as a minimum spacing between content and root element
    paddingInline: "1rem"
  }, ownerState.size === "lg" && {
    "--Icon-fontSize": theme.vars.fontSize.xl2,
    "--CircularProgress-size": "28px",
    // must be `px` unit, otherwise the CircularProgress is broken in Safari
    "--CircularProgress-thickness": "4px",
    "--Button-gap": "0.75rem",
    minHeight: "var(--Button-minHeight, 2.75rem)",
    fontSize: theme.vars.fontSize.md,
    paddingBlock: "var(--Button-paddingBlock, 0.5rem)",
    paddingInline: "1.5rem"
  }, {
    WebkitTapHighlightColor: "transparent",
    boxSizing: "border-box",
    borderRadius: `var(--Button-radius, ${theme.vars.radius.sm})`,
    // to be controlled by other components, for example Input
    margin: `var(--Button-margin)`,
    // to be controlled by other components, for example Input
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    textDecoration: "none",
    // prevent user agent underline when used as anchor
    fontFamily: theme.vars.fontFamily.body,
    fontWeight: theme.vars.fontWeight.lg,
    lineHeight: theme.vars.lineHeight.md
  }, ownerState.fullWidth && {
    width: "100%"
  }, {
    [theme.focus.selector]: theme.focus.default
  }), _extends({}, (_a = theme.variants[ownerState.variant]) == null ? void 0 : _a[ownerState.color], {
    "&:hover": {
      "@media (hover: hover)": (_b = theme.variants[`${ownerState.variant}Hover`]) == null ? void 0 : _b[ownerState.color]
    },
    '&:active, &[aria-pressed="true"]': (_c = theme.variants[`${ownerState.variant}Active`]) == null ? void 0 : _c[ownerState.color],
    [`&.${buttonClasses_default.disabled}`]: (_d = theme.variants[`${ownerState.variant}Disabled`]) == null ? void 0 : _d[ownerState.color]
  }, ownerState.loadingPosition === "center" && {
    // this has to come after the variant styles to take effect.
    [`&.${buttonClasses_default.loading}`]: {
      color: "transparent"
    }
  })];
};
var ButtonRoot = styled_default("button", {
  name: "JoyButton",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})(getButtonStyles);
var Button = React3.forwardRef(function Button2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "JoyButton"
  });
  const {
    children,
    action,
    color: colorProp = "primary",
    variant: variantProp = "solid",
    size: sizeProp = "md",
    fullWidth = false,
    startDecorator,
    endDecorator,
    loading = false,
    loadingPosition = "center",
    loadingIndicator: loadingIndicatorProp,
    disabled: disabledProp,
    component,
    slots = {},
    slotProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const buttonGroup = React3.useContext(ButtonGroupContext_default);
  const toggleButtonGroup = React3.useContext(ToggleButtonGroupContext_default);
  const variant = inProps.variant || buttonGroup.variant || variantProp;
  const size = inProps.size || buttonGroup.size || sizeProp;
  const color = inProps.color || buttonGroup.color || colorProp;
  const disabled = (inProps.loading || inProps.disabled) ?? (buttonGroup.disabled || loading || disabledProp);
  const buttonRef = React3.useRef(null);
  const handleRef = useForkRef(buttonRef, ref);
  const {
    focusVisible,
    setFocusVisible,
    getRootProps
  } = useButton(_extends({}, props, {
    disabled,
    rootRef: handleRef
  }));
  const loadingIndicator = loadingIndicatorProp ?? (0, import_jsx_runtime.jsx)(CircularProgress_default, {
    color,
    thickness: {
      sm: 2,
      md: 3,
      lg: 4
    }[size] || 3
  });
  React3.useImperativeHandle(action, () => ({
    focusVisible: () => {
      var _a;
      setFocusVisible(true);
      (_a = buttonRef.current) == null ? void 0 : _a.focus();
    }
  }), [setFocusVisible]);
  const ownerState = _extends({}, props, {
    color,
    fullWidth,
    variant,
    size,
    focusVisible,
    loading,
    loadingPosition,
    disabled
  });
  const classes = useUtilityClasses(ownerState);
  const handleClick = (event) => {
    var _a;
    let onClick = props.onClick;
    if (typeof slotProps.root === "function") {
      onClick = slotProps.root(ownerState).onClick;
    } else if (slotProps.root) {
      onClick = slotProps.root.onClick;
    }
    onClick == null ? void 0 : onClick(event);
    if (toggleButtonGroup) {
      (_a = toggleButtonGroup.onClick) == null ? void 0 : _a.call(toggleButtonGroup, event, props.value);
    }
  };
  let ariaPressed = props["aria-pressed"];
  if (typeof slotProps.root === "function") {
    ariaPressed = slotProps.root(ownerState)["aria-pressed"];
  } else if (slotProps.root) {
    ariaPressed = slotProps.root["aria-pressed"];
  }
  if (toggleButtonGroup == null ? void 0 : toggleButtonGroup.value) {
    if (Array.isArray(toggleButtonGroup.value)) {
      ariaPressed = toggleButtonGroup.value.indexOf(props.value) !== -1;
    } else {
      ariaPressed = toggleButtonGroup.value === props.value;
    }
  }
  const externalForwardedProps = _extends({}, other, {
    component,
    slots,
    slotProps
  });
  const [SlotRoot, rootProps] = useSlot("root", {
    ref,
    className: classes.root,
    elementType: ButtonRoot,
    externalForwardedProps,
    getSlotProps: getRootProps,
    ownerState,
    additionalProps: {
      onClick: handleClick,
      "aria-pressed": ariaPressed
    }
  });
  const [SlotStartDecorator, startDecoratorProps] = useSlot("startDecorator", {
    className: classes.startDecorator,
    elementType: ButtonStartDecorator,
    externalForwardedProps,
    ownerState
  });
  const [SlotEndDecorator, endDecoratorProps] = useSlot("endDecorator", {
    className: classes.endDecorator,
    elementType: ButtonEndDecorator,
    externalForwardedProps,
    ownerState
  });
  const [SlotLoadingIndicatorCenter, loadingIndicatorCenterProps] = useSlot("loadingIndicatorCenter", {
    className: classes.loadingIndicatorCenter,
    elementType: ButtonLoadingCenter,
    externalForwardedProps,
    ownerState
  });
  return (0, import_jsx_runtime.jsxs)(SlotRoot, _extends({}, rootProps, {
    children: [(startDecorator || loading && loadingPosition === "start") && (0, import_jsx_runtime.jsx)(SlotStartDecorator, _extends({}, startDecoratorProps, {
      children: loading && loadingPosition === "start" ? loadingIndicator : startDecorator
    })), children, loading && loadingPosition === "center" && (0, import_jsx_runtime.jsx)(SlotLoadingIndicatorCenter, _extends({}, loadingIndicatorCenterProps, {
      children: loadingIndicator
    })), (endDecorator || loading && loadingPosition === "end") && (0, import_jsx_runtime.jsx)(SlotEndDecorator, _extends({}, endDecoratorProps, {
      children: loading && loadingPosition === "end" ? loadingIndicator : endDecorator
    }))]
  }));
});
true ? Button.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({
    current: import_prop_types.default.shape({
      focusVisible: import_prop_types.default.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["danger", "neutral", "primary", "success", "warning"]), import_prop_types.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types.default.bool,
  /**
   * Element placed after the children.
   */
  endDecorator: import_prop_types.default.node,
  /**
   * @ignore
   */
  focusVisibleClassName: import_prop_types.default.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: import_prop_types.default.bool,
  /**
   * If `true`, the loading indicator is shown and the button becomes disabled.
   * @default false
   */
  loading: import_prop_types.default.bool,
  /**
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default we render a `CircularProgress` that is labelled by the button itself.
   * @default <CircularProgress />
   */
  loadingIndicator: import_prop_types.default.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: import_prop_types.default.oneOf(["center", "end", "start"]),
  /**
   * @ignore
   */
  onClick: import_prop_types.default.func,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["sm", "md", "lg"]), import_prop_types.default.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    endDecorator: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    loadingIndicatorCenter: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    startDecorator: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    endDecorator: import_prop_types.default.elementType,
    loadingIndicatorCenter: import_prop_types.default.elementType,
    root: import_prop_types.default.elementType,
    startDecorator: import_prop_types.default.elementType
  }),
  /**
   * Element placed before the children.
   */
  startDecorator: import_prop_types.default.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * @default 0
   */
  tabIndex: import_prop_types.default.number,
  /**
   * @ignore
   */
  value: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.string), import_prop_types.default.number, import_prop_types.default.string]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'solid'
   */
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["outlined", "plain", "soft", "solid"]), import_prop_types.default.string])
} : void 0;
Button.muiName = "Button";
var Button_default = Button;
export {
  buttonClasses_default as buttonClasses,
  Button_default as default,
  getButtonUtilityClass
};
//# sourceMappingURL=@mui_joy_Button.js.map
