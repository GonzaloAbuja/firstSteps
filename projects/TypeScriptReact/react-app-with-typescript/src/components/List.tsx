import {Sub} from './type'
interface Props{
    subs:Array<Sub>

}
const List= ({ subs }: Props)=> {
    return (
      <ul>
        {subs.map((sub) => (
          <li key={sub.nick}>
            <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
            <h4>{sub.nick} ({sub.subMonths} months)</h4>
            <p>{sub.description?.substring(0, 100)}</p>
          </li>
        ))}
      </ul>
    );
  }
  export default List;