import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { getTranslations } from "next-intl/server";
import { type CSSProperties } from "react";

import { type Locale } from "@/i18n/config";
import { type Customer } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const Default = async ({ customer, locale }: { customer: Customer; locale: Locale }) => {
  const t = await getTranslations({ locale, namespace: "Emails.welcome" });

  const { messages } = await getCachedGlobal("emailMessages", locale, 1)();

  return (
    <Html>
      <Head />
      <Preview>{t("preview")}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={message}>
            {messages?.logo && typeof messages.logo === "object" && "alt" in messages.logo && (
              <Img
                alt={messages.logo.alt ?? ""}
                src={`${baseUrl}${messages.logo.url ?? ""}`}
                width="66"
                height="22"
                style={{ margin: "auto" }}
              />
            )}
            <Heading style={global.heading}>
              {t("greeting", { name: customer.firstName ?? "Customer" })}
            </Heading>
            <Text style={global.text}>{t("subject")}</Text>
            <Text style={{ ...global.text, marginTop: 24 }}>{t("body")}</Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Link style={{ ...global.button, marginLeft: "auto", marginRight: "auto" }} href={baseUrl}>
              {t("button")}
            </Link>
          </Section>
          <Hr style={global.hr} />
          <Section style={menu.container}>
            <Row>
              <Text style={menu.title}>Get Help</Text>
            </Row>
            <Row style={menu.content}>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href="/" style={menu.text}>
                  Shipping Status
                </Link>
              </Column>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href="/" style={menu.text}>
                  Shipping & Delivery
                </Link>
              </Column>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href="/" style={menu.text}>
                  Returns & Exchanges
                </Link>
              </Column>
            </Row>
            <Row style={{ ...menu.content, paddingTop: "0" }}>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href="/" style={menu.text}>
                  How to Return
                </Link>
              </Column>
              <Column style={{ width: "66%" }} colSpan={2}>
                <Link href="/" style={menu.text}>
                  Contact Options
                </Link>
              </Column>
            </Row>
            <Hr style={global.hr} />
            <Row style={menu.tel}>
              <Column>
                <Row>
                  <Column style={{ width: "16px" }}>
                    <Img
                      src={`${baseUrl}/static/nike-phone.png`}
                      width="16px"
                      height="26px"
                      style={{ paddingRight: "14px" }}
                    />
                  </Column>
                  <Column>
                    <Text style={{ ...menu.text, marginBottom: "0" }}>1-800-806-6453</Text>
                  </Column>
                </Row>
              </Column>
              <Column>
                <Text
                  style={{
                    ...menu.text,
                    marginBottom: "0",
                  }}
                >
                  4 am - 11 pm PT
                </Text>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={paddingY}>
            <Row>
              <Text style={global.heading}>Mandala</Text>
            </Row>
            <Row style={categories.container}>
              <Column align="center">
                <Link href="/" style={categories.text}>
                  Men
                </Link>
              </Column>
              <Column align="center">
                <Link href="/" style={categories.text}>
                  Women
                </Link>
              </Column>
              <Column align="center">
                <Link href="/" style={categories.text}>
                  Kids
                </Link>
              </Column>
              <Column align="center">
                <Link href="/" style={categories.text}>
                  Customize
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={{ ...global.hr, marginTop: "12px" }} />
          <Section style={paddingY}>
            <Row style={footer.policy}>
              <Column>
                <Text style={footer.text}>Web Version</Text>
              </Column>
              <Column>
                <Text style={footer.text}>Privacy Policy</Text>
              </Column>
            </Row>
            <Row>
              <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
                Please contact us if you have any questions. (If you reply to this email, we wont be able to
                see it.)
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>© 2022 Nike, Inc. All Rights Reserved.</Text>
            </Row>
            <Row>
              <Text style={footer.text}>NIKE, INC. One Bowerman Drive, Beaverton, Oregon 97005, USA.</Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as CSSProperties,
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  } as CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as CSSProperties;

const menu = {
  container: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "20px",
    backgroundColor: "#F7F7F7",
  },
  content: {
    ...paddingY,
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  title: {
    paddingLeft: "20px",
    paddingRight: "20px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "13.5px",
    marginTop: 0,
    fontWeight: 500,
    color: "#000",
  },
  tel: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "32px",
    paddingBottom: "22px",
  },
};

const categories = {
  container: {
    width: "370px",
    margin: "auto",
    paddingTop: "12px",
  },
  text: {
    fontWeight: "500",
    color: "#000",
  },
};

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as CSSProperties,
};
