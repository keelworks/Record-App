"use client";
import "./chunk-4B77AAQV.js";
import {
  createStack,
  generateUtilityClass,
  generateUtilityClasses,
  styled_default,
  useThemeProps
} from "./chunk-FNE6UPPL.js";
import "./chunk-4L44OEO5.js";
import "./chunk-WX5Z3QDG.js";
import "./chunk-4HJ7CV5Z.js";
import "./chunk-Q27KEZHG.js";
import {
  require_prop_types
} from "./chunk-ZM6LQ52J.js";
import "./chunk-W4EHDCLL.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/joy/Stack/Stack.js
var import_prop_types = __toESM(require_prop_types());
var Stack = createStack({
  createStyledComponent: styled_default("div", {
    name: "JoyStack",
    slot: "Root",
    overridesResolver: (props, styles) => styles.root
  }),
  useThemeProps: (inProps) => useThemeProps({
    props: inProps,
    name: "JoyStack"
  })
});
true ? Stack.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types.default.arrayOf(import_prop_types.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types.default.object]),
  /**
   * Add an element between each child.
   */
  divider: import_prop_types.default.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])), import_prop_types.default.number, import_prop_types.default.object, import_prop_types.default.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/joy-ui/customization/themed-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: import_prop_types.default.bool
} : void 0;
var Stack_default = Stack;

// node_modules/@mui/joy/Stack/stackClasses.js
function getStackUtilityClass(slot) {
  return generateUtilityClass("MuiStack", slot);
}
var stackClasses = generateUtilityClasses("MuiStack", ["root"]);
var stackClasses_default = stackClasses;
export {
  Stack_default as default,
  getStackUtilityClass,
  stackClasses_default as stackClasses
};
//# sourceMappingURL=@mui_joy_Stack.js.map
