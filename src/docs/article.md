React - Composing Higher-Order Components (HOCs)

Intro

To put it simply, a higher-order component is a function, that takes a component and returns a new component. I like to think of them as parameterized components. Many times I find myself creating several components with very similar logic, with only 1 or 2 changes. Once I find a use case like this, it's very simple to abstract the shared logic, and put the logic that changes into parameters. You can read more about HOCs here, in the official React docs. Since components are just functions and HOCs are just functions that return other functions, we can use functional concepts to chain them using utilities methods such as compose, which is provided by many libraries (it's included in Redux!).

I'm going to talk about a few common use cases, then go over their implementation, and a few ways they can be composed together to make even more powerful HOCs!

Follow Along (Example App)

You can following along with a simple React app I create to demonstrate the following concepts and use cases. It can be used in browser or cloned from the repository.

Live sandbox: https://codesandbox.io/s/github/caseymorrisus/composing-hocs

GitHub repo: https://github.com/caseymorrisus/composing-hocs

Use Cases

Now that we know a little about higher-order components, we can go over a few common use cases. 

Loader

It's common to pull data from an API and display a "spinner" or message until the data has been fetched. You may have a standard Loading component which has a prop message for displaying a loading message specific to your current application. 

Error

Almost identical to the Loader HOC, but instead displays an Error component and expects an error prop. Can be supplied a custom Error component.

Default

It's good practice to display some type of message if data was successfully fetched, but none of the given type were returned from the data source. For example, instead of display a blank list of posts, if no posts have been created, you could have a DefaultPost component which could prompt the user to create a post.

Data

Container components frequently fetch data and pass that data as a prop to a child component. Generally the only thing that changes between these container components is the API endpoint. We can also use HOCs to easily pass in mock data for development purposes.

MockData

Used for development purposes to quickly prototype components before an API endpoint has been created or implemented within your React project. Data and a delay (to mock async data fetching) are supplied to the HOC. Data is passed down to the wrapped component.

Logger

Easily log all prop changes (on render) for a given component, helpful for quick debugging purposes.

Props

Sometimes you need to inject props into a component, this is especially useful when using a branch HOC and only want a single branch to receive specific props.

Timeouts

Adding a timeout that controls state within React will throw an error if a component unmounts before the function supplied to the timeout has fired. We can create an HOC that handles and shares functionality to easily add and clear timeouts.

Container

It's fairly common to have a container component, which fetches data, and renders a list of components using that data. We can combine this with other HOCs such as: hasloader ,hasError, andhasDefault to extend functionality further.

List

As stated above, it's fairly common to take an array of data and render a component for each item in the array. This HOC will also spread the current data item as props into the supplied component.

HOCs

Now that we've gone over a few use cases, lets look at some simple implementations before we get into any complex chaining.

hasProps

Takes a single parameter, injectedProps and returns a wrapped component with the supplied injectedProps . Useful when you need to inject props to a single component within the branch hoc, as the props supplied are injected into both passing and failing components.

    const hasProps = injectedProps => WrappedComponent => {
      const HasProps = props => <WrappedComponent {...injectedProps} {...props} />
    
      return HasProps
    }

Use:

    hasProps({sample: 'Sample Prop'})(Component)

Use with branch HOC:

    branch(
      // ...
      hasProps({sample: 'Sample Prop'})(Component)
      // ...
    )



hasLogger

Takes a single parameter, prefix which prefixes the logged message, defaults to an empty string. Logs props to the console on every render of the WrappedComponent.

    const hasLogger = (prefix = '') => WrappedComponent => {
      const HasLogger = props => {
        console.log(`${prefix}[Props]:`, props)
        return <WrappedComponent {...props} />
      }
    
      return HasLogger
    }

Use:

    hasLogger(Component)



branch

Takes 3 parameters: test, ComponentOnPass, and ComponentOnFail and returns either of the supplied components depending on the result of the test function. If the test function returns true, ComponentOnPass will be returned, if false, ComponentOnFail will be returned. Immediately returns a new component unlike other HOCs in this post.

    const branch = (test, ComponentOnPass, ComponentOnFail) => props => test
      ? <ComponentOnPass {...props} />
      : ComponentOnFail
        ? <ComponentOnFail {...props} />
        : null

Use:

    branch(testFunction, Component1, Component2)



hasMockData

Takes 2 parameters: mockData and delay and returns a wrapped component with a new data prop. mockData is injected into the data prop after the delay has passed. Can set delay to 0 or leave blank to have no delay. Uses the hasTimeouts HOC to extends functionality to include addTimeout and clearTimeout props.

    const hasMockData = (mockData, delay) => WrappedComponent => {
      class HasMockData extends React.Component {
        state = {
          data: [],
          useDefault: true
        }
    
        componentDidMount() {
          this.props.addTimeout(() => this.setState({data: mockData}), delay)
        }
    
        componentWillUnmount() {
          this.props.clearTimeouts()
        }
    
        render() {
          return <WrappedComponent data={this.state.data} {...this.props} />
        }
      }
    
      return hasTimeouts(HasMockData)
    }

Use:

    hasMockData({data: 'This is mock data'}, 1000)(Component)



hasLoader

This higher-order component has no parameters. It returns a wrapped component with new loading and loadingMessage props expected. It conditionally renders the supplied component if loading is false. Otherwise, it renders the Loading component with the loadingMessage supplied.

    const hasLoader = WrappedComponent => {
      const HasLoader = props => branch(
        props.loading,
        hasProps({message: props.loadingMessage})(Loading),
        WrappedComponent
      )(props)
    
      return HasLoader
    }

Use:

    hasLoader(Component)



hasError

Takes 1 parameter: ErrorComponent which has a default value of the Error component. Can supply a custom ErrorComponent if desired rather than using the default value. It returns a wrapped component with a new expected prop: hasError. It conditionally renders the supplied component if hasError is false. Otherwise, it renders the ErrorComponent.

    const hasError = (ErrorComponent = Error) => WrappedComponent => {
      const HasError = props =>
        branch(props.hasError, ErrorComponent, WrappedComponent)(props)
    
      return HasError
    }

Use:

    hasError(CustomErrorComponent)(Component)

Uses a default Error component if none is supplied:

    hasError()(Component)



hasDefault

Takes 1 parameter: Default which expects to be a React component. It returns a wrapped component with a new expected prop: useDefault. It conditionally renders the supplied component if useDefault is false. Otherwise, it renders the Default component.

    const hasDefault = Default => WrappedComponent => {
      const HasDefault = props =>
        branch(props.useDefault, Default, WrappedComponent)(props)
    
      return HasDefault
    }

Use:

    hasDefault(DefaultComponent)(Component)

hasData

Expects a single parameter object which expects properties of url, params, and loadingMessage. url dictates which endpoint is hit, params injects URL parameters for the request, and loadingMessage allows you to customize the loading message within the Loader component. Uses Axios to get data from an API endpoint. Axios can easily be replaced with your fetch implementation of choice. Injects data, hasError, error, useDefault, loading, and loadingMessage as props to be used in the wrapped component.

    const hasData = ({url, params, loadingMessage}) => WrappedComponent => {
      class HasData extends React.Component {
        state = {
          data: [],
          hasError: false,
          error: {
            title: 'Cannot retrieve Real Posts',
            message: 'Could not retrieve Real Posts from supplied API.'
          },
          useDefault: false,
          loading: false,
          loadingMessage
        }
    
        componentDidMount() {
          this.setState({loading: true})
    
          axios.get(url, { params })
          .then(({data}) => {
            this.setState({
              data,
              loading: false,
              hasError: false,
              useDefault: data.length === 0
            })
          })
          .catch(error => {
            console.log(error)
            this.setState({
              hasError: true,
              loading: false
            })
          })
        }
    
        render() {
          return (
            <WrappedComponent 
              {...this.state}
              {...this.props}
            />
          )
        }
      }
    
      return HasData
    }

Use:

    hasData({
      url: 'https://jsonplaceholder.typicode.com/posts',
      params: {
        _limit: 10,
        page: 2
      },
      loadingMessage: 'Loading posts from JSON Placeholder...'
    })(Component)



hasTimeouts

Expects no parameters and returns a wrapped component with injected props addTimeout and clearTimeouts. These props allow you to easily create timeouts and be able to clear them when a component unmounts. If you have an active timeout and unmount a component, it will throw an error.

    const hasTimeouts = WrappedComponent => {
      class HasTimeouts extends React.Component {
        constructor(props) {
          super(props)
          this.timeouts = []
          this.addTimeout = this.addTimeout.bind(this)
          this.clearTimeouts = this.clearTimeouts.bind(this)
        }
    
        addTimeout(func, delay) {
          this.timeouts.push(setTimeout(func, delay))
        }
    
        clearTimeouts() {
          this.timeouts.forEach(clearTimeout)
        }
    
        render() {
          return (
            <WrappedComponent
              addTimeout={this.addTimeout}
              clearTimeouts={this.clearTimeouts}
              {...this.props} 
            />
          )
        }
      }
    
      return HasTimeouts
    }

Use:

    hasTimeouts(Component)



isList

Expects a single parameter type which dictates the className used in the wrapped div for the list. This HOC expects the list component to have a data prop which contains an array of items. All properties of individual items are injected as props to the individual wrapped component.

    const isList = type => WrappedComponent => {
      const IsList = props => (
        <div className={type}>
          {props.data.map(item => (
            <WrappedComponent {...item} key={item.id} />
          ))}
        </div>
      )
    
      return IsList
    }

Use:

    isList('component-type')(Component)

Composition Using Higher-Order Components

The true power of HOCs comes when you start to chain (compose) them. You can chain as many of them as you like. If you have a component which needs an error and default state, simply compose it like so:

    compose(
      hasError(ErrorComponent),
      hasDefault(DefaultComponent)
    )(Component)

The returned component can now be controlled to show an error or a default using its props. In the case of the above example, if useDefault and hasError are both true, hasError and the ErrorComponent would take precedent since it is first within the compose function. 

Do you want to add logging to the above component and also supply it with mockData? Easy! Simply change the above to:

    compose(
      hasLogger(),
      hasMockData(mockData, delay),
      hasError(ErrorComponent),
      hasDefault(DefaultComponent)
    )

HOCs can easily be added and composed to extend the functionality of any component!

isContainer

Expects a single parameter object with props data, Error, and DefaultComponent. data is expected to be the param object expected by the hasData HOC. Error expects a custom error component, but if left blank will display the default error component. DefaultComponent expects a component to display in the container list if no items were fetched from the API.

    const isContainer = ({data, Error, DefaultComponent}) => WrappedComponent => {
      const IsContainer = props => <WrappedComponent {...props} />
    
      return compose(
        hasData(data),
        hasLoader,
        hasError(Error),
        hasDefault(DefaultComponent)
      )(IsContainer)
    }

Use:

    isContainer({
      data: {
        url: 'https://jsonplaceholder.typicode.com/posts', 
        params: {
          page: 2,
          _limit: 10
        },
        loadingMessage: "Loading Posts..."
      },
      DefaultComponent: PostDefault
    })(PostList)



Quick Note About Debugging

For debugging purposes, we are making our code a bit more verbose. Using the hasProps HOC as an example, we could further simplify it like so:

    const hasProps = injectedProps => WrappedComponent => props => <WrappedComponent {...injectedProps} {...props} />

The problem with this is that when viewed in the React Developer Tools, the component comes back as Unknown as it was never given a name. Using the original example provided for the hasProp HOC would display a HasProps component within the React Developer Tools.

Using Redux Compose

As mentioned above, Redux supplies a compose method that can be imported and used like so:

    import { compose } from 'redux'
    
    compose(
      // ...do stuff
    )(Component)

You can read more about their implementation over at their documentation here. The compose function isn't very special in itself, it can be imported from many libraries.

Example App

Home Page

The provided example app shows use of all concepts above. The home page includes components that have been extended with HOCs and also includes buttons to control the props that control the HOCs used to extend them. To put it simply, you're able to click a button and switch which component renders based on props. This page includes a MockPostContainer which extends the Post component with a logger, mock data, loader, error, default, and list. 

Posts, Todos, Comments, and Users Pages

All of these pages consume real API endpoints from https://jsonplaceholder.typicode.com/ . They each extend a single component (Post, Todo, Comment, User) with the isContainer and isList HOCs. 

Wrapping Up

I hope the above patterns / components help you create some new higher-order components of your own. These are the most common use cases for me, I'm sure you probably have a few common use cases not listed above. I'd love to hear how higher-order components have helped you simplify your code!

If you appreciated the article and it helped in any way, don't hesitate to share and clap!
