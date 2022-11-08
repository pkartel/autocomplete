# What is the difference between Component and PureComponent?

The difference between creating your class based on React.Component or React.PureComponent is exclusively in the implementation of shouldComponentUpdate lifecycle hook. 

In PureComponent it performs shallow comparison of state and props to determine whether corresponded component needs to be updated. The regular implementation returns true regardless though. 

Extending from PureComponent might be considered as a performance improvement alternative. However, if component's render does not produce same markup based on the same props and state every time (is not pure)extending from PureComponent might lead to unexpected behavior and missing updates. In that case React.Component + custom implementation of shouldComponentUpdate hook might be a better solution.

# Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

If some intermediate context-independant ansestors of the component "A" which is using context are based on PureComponent (implements shouldComponentUpdate ) it might block the component "A" (that needs context) from update as well when context value changes. That said, parent's shouldComponentUpdate returns false (props and state haven't changed), neither the parent nor any of its descendants (including component "A") are updated.

# Describe 3 ways to pass information from a component to its PARENT.

1. Since React enforces one-way data flow it is possible only by lifting state up via callback props passed from Parent to Child component and called by child with nesessary info.

2. UseReducer hook or state management libs (ex Redux) help to update and sync data anywhere through the app (including child component, and get updates on parent components) 

3. Using Context 

# Give 2 ways to prevent components from re-rendering.

Component re-renders when either state, props, provided context changes or its parent re-renders.

1. Use memoization (useMemo, PureComponent).
2. Store data in refs if it doen't affect how component is displayed.
3. Split context into small logic-related contexts to provide only necessary data.
4. Use composition.

# What is a fragment and why do we need it? Give an example where it might break my app.

In React components should return a markup wrapped into a single parent node. Fragments (wrapper which are actually not reflected in DOM) are introduced to avoid extra div wrappers and DOM tree cluttering.
However, Fragments are not a replacement for div's or other html element since they cannot be assigned styles to for example.

# Give 3 examples of the HOC pattern.

1. Provide data access to the component (ex connect from React-redux).
2. Logging
3. Styled-components lib is based on this approach. There are functions accepting components and returning them wrapped into a styled component.

# what's the difference in handling exceptions in promises, callbacks and async...await.

For promises catch() method is used.
For async await syntax - regular try {} catch {} block.
For callbacks (depends on the API) callback's input may be verified for an error and corresponded handling logic might be called.

# How many arguments does setState take and why is it async.
setState takes 2 args: updater fn and callback (optional).
Updater fn's signature: (state, props) => updatedPartOfState.
The optional callback fn will be executed as soon as setState operation is completed and the component is re-rendered.

The reason for callback fn is the async nature of the setState. It is designed this way to provide possibility to batch multiple setState() calls into a single update if needed for performance reasons.

# List the steps needed to migrate a Class to Function Component.

1. Create a function, with the same name.
2. Move to the function return content of the render() method.
3. Define corresponded props as the function's input and replace this.props with the input props.
4. Use hooks if some additional logic related to component's state / lifecycle, context, refs was present.
4. Delete class.

# List a few ways styles can be used with components.
1. External CSS files with or without preprocessors (Sass/Less) imported to the corresponded page.

Scoped / incapsulated aproaches:
2. Inline styling
3. CSS Modules
4. CSS-in-JS (react-jss / styled components)


# How to render an HTML string coming from the server.

1. dangerouslySetInnerHTML attribute may be used, which is a react alternative of native innerHTML property (vulnerable to XSS).

2. html-react-parser library may be used to parse the string into html directly.