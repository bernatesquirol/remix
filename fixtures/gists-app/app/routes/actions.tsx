import { Form, json, useActionData, useLoaderData, useSubmission } from "remix";
import type { HeadersFunction, ActionFunction } from "remix";

export function loader() {
  return "ay! data from the loader!";
}

export let action: ActionFunction = async ({ request }) => {
  let body = new URLSearchParams(await request.text());
  return json(`heyooo, data from the action: ${body.get("field1")}`, {
    headers: {
      "x-test": "works"
    }
  });
};

export let headers: HeadersFunction = ({ actionHeaders }) => {
  return {
    "x-test": actionHeaders.get("x-test")!
  };
};

export default function Actions() {
  let actionData = useActionData();
  let loaderData = useLoaderData();
  let submission = useSubmission();

  return (
    <Form method="post" id="form">
      <p id="action-text">
        {actionData ? <span id="action-data">{actionData}</span> : "Waiting..."}
      </p>
      <p>
        <input type="text" defaultValue="stuff" name="field1" />
        <button type="submit" id="submit" disabled={!!submission}>
          Go
        </button>
      </p>
      <p>{loaderData}</p>
    </Form>
  );
}