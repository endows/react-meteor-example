Tasks = new Mongo.Collection("tasks");

var List = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    // This method knows how to listen to Meteor's reactive data sources,
    // such as collection queries
    return {
      // Return an array with all items in the collection
      tasks: Tasks.find().fetch()
    };
  },
  render () {
    return (
      <div>
        <img src='http://lohas.nicoseiga.jp/thumb/4521080i?'></img>
        <h1>Hello worldですぅ!!!!</h1>
          <ul>
    {/* Access the data from getMeteorData() on this.data */}
    {this.data.tasks.map(function (task) {
      return <li key={task._id}>{task.content}</li>;
    })}
  </ul>
      </div>
    );
  }
});

var NewTaskForm = React.createClass({
  onSubmit(event) {
    event.preventDefault();

    var taskContent = React.findDOMNode(this.refs.content).value;

    Meteor.call("insertTask", {
      content: taskContent
    });

    React.findDOMNode(this.refs.content).value = "";
  },
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" ref="content" placeholder="Add a task..." />
      </form>
    );
  }
})

var App = React.createClass({
  render() {
    return (
      <div>
        <List />
        <NewTaskForm />
      </div>
    );
  }
});

Meteor.methods({
  insertTask: function (task) {
    // Validate the data
    check(task, {
      content: String
    });

    // Insert into MongoDB and Minimongo
    Tasks.insert(task);
  }
});

if (Meteor.isClient) {
  Meteor.startup(function () {
    React.render(<App />, document.getElementById('root'));
  });
}
