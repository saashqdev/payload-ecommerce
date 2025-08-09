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
import { type Media, type Order } from "@/payload-types";
import { formatDateTime } from "@/utilities/formatDateTime";
import { formatPrice } from "@/utilities/formatPrices";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getOrderProducts } from "@/utilities/getOrderProducts";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const Default = async ({ order, locale }: { order: Order; locale: Locale }) => {
  const t = await getTranslations({ locale, namespace: "Order" });

  const products = await getOrderProducts(order.products, locale);
  const { messages } = await getCachedGlobal("emailMessages", locale, 1)();

  return (
    <Html>
      <Head />
      <Preview>Get your order summary, estimated delivery date and more</Preview>
      <Body style={main}>
        <Container style={container}>
          {order.orderDetails.status === "shipped" && (
            <Section style={track.container}>
              <Row>
                <Column>
                  <Text style={global.paragraphWithBold}>Tracking Number</Text>
                  <Text style={track.number}>{order.orderDetails.trackingNumber}</Text>
                </Column>
                <Column align="right">
                  {/* TODO: tracking link in order config */}
                  <Link style={global.button}>Track Package</Link>
                </Column>
              </Row>
            </Section>
          )}
          <Hr style={global.hr} />
          <Section style={message}>
            {messages?.logo &&
              typeof messages.logo === "object" &&
              "alt" in messages.logo &&
              "url" in messages.logo && (
                <Img
                  alt={messages.logo.alt ?? ""}
                  src={`${baseUrl}${messages.logo.url ?? ""}`}
                  width="66"
                  height="22"
                  style={{ margin: "auto" }}
                />
              )}
            <Heading style={global.heading}>{t(`${order.orderDetails.status}.title`)}</Heading>
            <Text style={global.text}>
              {t(`${order.orderDetails.status}.subtitle`, { orderID: order.id })}
            </Text>
            {messages.additionalText && (
              <Text style={{ ...global.text, marginTop: 24 }}>{messages.additionalText}</Text>
            )}
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text style={adressTitle}>Shipping to: {order.shippingAddress.name}</Text>
            <Text style={{ ...global.text, fontSize: 14 }}>
              {order.shippingAddress.address}, {order.shippingAddress.postalCode} {order.shippingAddress.city}
              , {order.shippingAddress.region}
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}>
            {products?.map((product) => {
              const selectedVariant = product.variants?.find(
                (variant) => variant.variantSlug === product.variantSlug,
              );
              const productImage =
                product.variants && product.variantSlug
                  ? ((product.variants.find((variant) => product.variantSlug === variant.variantSlug)
                      ?.image ?? product.images[0]) as Media | undefined)
                  : (product.images[0] as Media);
              return (
                <Row key={`${product.id}-${product.variantSlug}`}>
                  <Column>
                    <Img
                      alt={productImage?.alt ?? ""}
                      src={`${baseUrl}${productImage?.url ?? ""}`}
                      style={{ float: "left" }}
                      width="260px"
                    />
                  </Column>
                  <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
                    <Link
                      href={`${baseUrl}/${locale}/product/${product.slug}${product.variants && selectedVariant && `?variant=${selectedVariant.variantSlug}`}`}
                      style={{ ...paragraph, fontWeight: "500" }}
                    >
                      {product.title}
                    </Link>
                    {product.variants && product.variantSlug && (
                      <Text style={global.text}>
                        {product.color}
                        {product.color && product.size && ", "}
                        {product.size}
                      </Text>
                    )}
                    <Text style={{ ...paragraph, fontWeight: "400" }}>
                      {formatPrice(product.price ?? 0, order.orderDetails.currency, locale)} x{" "}
                      {product.quantity}
                    </Text>
                    <Text style={{ ...paragraph, fontWeight: "500" }}>
                      {formatPrice(product.priceTotal, order.orderDetails.currency, locale)}
                    </Text>
                  </Column>
                </Row>
              );
            })}
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row style={{ display: "inline-flex", marginBottom: 40 }}>
              <Column style={{ width: "170px" }}>
                <Text style={global.paragraphWithBold}>Order Number</Text>
                <Text style={track.number}>{order.id}</Text>
              </Column>
              <Column>
                <Text style={global.paragraphWithBold}>Order Date</Text>
                <Text style={track.number}>{formatDateTime(order.createdAt, "EU")}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Link href={`${baseUrl}/${locale}/order/${order.id}`} style={global.button}>
                  Order Status
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          {/*
          TODO: Top picks / hotspot not included in MVP. Add it later.
          <Section style={paddingY}>
            <Row>
              <Text style={global.heading}>Top Picks For You</Text>
            </Row>
            <Row style={recomendations.container}>
              <Column style={{ ...recomendations.product, paddingLeft: "4px" }} align="center">
                <Img
                  src={`${baseUrl}/static/nike-recomendation-1.png`}
                  alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                  width="100%"
                />
                <Text style={recomendations.title}>USWNT 2022/23 Stadium Home</Text>
                <Text style={recomendations.text}>Women's Nike Dri-FIT Soccer Jersey</Text>
              </Column>
              <Column style={recomendations.product} align="center">
                <Img
                  src={`${baseUrl}/static/nike-recomendation-2.png`}
                  alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                  width="100%"
                />
                <Text style={recomendations.title}>Brazil 2022/23 Stadium Goalkeeper</Text>
                <Text style={recomendations.text}>Men's Nike Dri-FIT Short-Sleeve Football Shirt</Text>
              </Column>
              <Column style={recomendations.product} align="center">
                <Img
                  src={`${baseUrl}/static/nike-recomendation-4.png`}
                  alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                  width="100%"
                />
                <Text style={recomendations.title}>FFF</Text>
                <Text style={recomendations.text}>Women's Soccer Jacket</Text>
              </Column>
              <Column style={{ ...recomendations.product, paddingRight: "4px" }} align="center">
                <Img
                  src={`${baseUrl}/static/nike-recomendation-4.png`}
                  alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                  width="100%"
                />
                <Text style={recomendations.title}>FFF</Text>
                <Text style={recomendations.text}>Women's Nike Pre-Match Football Top</Text>
              </Column>
            </Row>
          </Section> */}
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
                Please contact us if you have any questions. (If you reply to this email, we won&apos;t be
                able to see it.)
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

const track = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
  },
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as CSSProperties;

const adressTitle = {
  ...paragraph,
  fontSize: "15px",
  fontWeight: "bold",
};

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
