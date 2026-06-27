import type { FC } from "react";

import {
  Card,
  CardSection,
  CardSeparator,
  CardTitle,
} from "@sandwich-ui/react";

import { m } from "../../paraglide/messages";

export const Languages: FC = () => {
  return (
    <section>
      <Card>
        <CardSection>
          <CardTitle>{m["cv.languages.title"]()}</CardTitle>
        </CardSection>
        <CardSeparator />
        <CardSection>
          <ul>
            <li>{m["cv.languages.french"]()}</li>
            <li>{m["cv.languages.english"]()}</li>
          </ul>
        </CardSection>
      </Card>
    </section>
  );
};
