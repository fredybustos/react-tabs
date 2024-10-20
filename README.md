# Tabs Component

This React library offers a fully customizable, dynamic tab system that allows developers to easily integrate multi-view content navigation into their applications. Designed for versatility and ease of use, this tab component can seamlessly fit into any project, whether you're building a dashboard, a user profile, or a data-driven application.


### Installation

To install the tabs component, run the following command:

```bash
  npm install @fredybustos/react-tabs
  or
  yarn add @fredybustos/react-tabs
```

**Import css file**

To ensure that the tab styles are applied correctly, you need to import the generated CSS file `tabs.min.css`. Depending on your working environment, you can do this in the following ways:

In your React project, add the following import statement to your `index.js` file, before importing your project's CSS:

```bash
import '@fredybustos/react-tabs/dist/esm/tabs.min.css';
```

### Usage

This is how you can set up a simple tab content. The active tab will be highlighted automatically, and users can switch between the sections seamlessly.

Import the Tabs component and render it with Tab components as children:

```jsx
import React from 'react';
import { Tabs, Tab } from '@fredybustos/react-tabs'

const App = () => {
  const handleSelect = ({ index, element }) => {
    console.log(`Selected tab ${index} with title ${element.title}`);
  };

  return (
    <Tabs onSelect={handleSelect}>
      <Tab title="Tab 1">
        Content of Tab 1
      </Tab>
      <Tab
        icon={<CommentIcon sx={{ mr: 2 }} />}
        title="Tab 2"
      >
        Content of Tab 2
      </Tab>
      <Tab
        disabled
        title="Tab 3"
      >
        Content of Tab 3
      </Tab>
    </Tabs>
  );
};
```

### Tab properties

```ts
type Styles = {
  style: React.CSSProperties
  className: string
}
```

|  Prop Name 	| Type  	|  Default Value 	| Description	|
|:-----------	|:-------	|:---------------	|:-------------	|
|  title 	    |   `React.ReactElement` | `string`	| Title to display in table header	|
|  active 	    |   `boolean` | `boolean`	| Whether the tab is active	|
|  testId 	    |   `string` | `tab-testid`	| 	Test ID for testing purposes	|
|  disabled 	    |   `boolean` | `false`	| 	Whether the tab is disabled	|
|  hideTab 	    |   `boolean` | `false`	| 	Whether to hide the tab	|
|  className 	    |   `string` | `tab`	| 	Additional class name	|
|  iconRight 	    |   `boolean` | `false`	| Whether to put icon right	|
|  style 	    |   `React.CSSProperties` | 	| 	Custom styles	|
|  children 	    |   `React.ReactNode - string` | 	| 	Tab information for rendering	|


### Tabs properties


|  Prop Name 	| Type  	|  Default Value 	| Description	|
|:-----------	|:-------	|:---------------	|:-------------	|
|  children 	| `React.ReactNode - string`	| Tabs information for rendering	|
|  className 	    |   `string` | `tabs-ctn`	| Additional class name	|
|  style 	    |   `React.CSSProperties` | 	| Custom styles|
|  activeStyles 	    |   `Styles` | 	| Custom active styles|
|  onSelect 	    |   `({ index: number; element: TabProps }) => void` | 	| Callback function when a tab is selected|


### License

This project is licensed under the [MIT LICENSE](../../main/LICENSE). See the  file for details.

### Contributing

Contributions are welcome! Please submit a pull request with your changes.
