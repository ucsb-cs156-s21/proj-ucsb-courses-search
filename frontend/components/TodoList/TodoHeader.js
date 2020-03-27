export function TodoHeader(props) {
  const name = props.user ? props.user.name.toLowerCase() : "user";
  return <h1 className="display-2 text-center">{name}'s todo list</h1>;
}
