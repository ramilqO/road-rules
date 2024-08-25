import { useParams } from "react-router-dom";

export default function Questions() {
  const { ticketId } = useParams();

  return (
    <div>
      <h1>Questions {ticketId}</h1>
    </div>
  );
}
