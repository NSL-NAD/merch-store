const PRINTIFY_API_BASE = "https://api.printify.com/v1";

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
    "Content-Type": "application/json",
  };
}

function getShopId() {
  return process.env.PRINTIFY_SHOP_ID!;
}

interface PrintifyAddress {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address1: string;
  address2?: string;
  city: string;
  region: string;
  zip: string;
  country: string;
}

interface PrintifyLineItem {
  product_id: string;
  variant_id: number;
  quantity: number;
}

interface CreateOrderParams {
  externalId: string;
  lineItems: PrintifyLineItem[];
  shippingAddress: PrintifyAddress;
}

export async function createPrintifyOrder({
  externalId,
  lineItems,
  shippingAddress,
}: CreateOrderParams): Promise<{ id: string }> {
  const shopId = getShopId();

  const response = await fetch(
    `${PRINTIFY_API_BASE}/shops/${shopId}/orders.json`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        external_id: externalId,
        label: `GAS Merch Lab #${externalId.slice(0, 8).toUpperCase()}`,
        line_items: lineItems,
        shipping_method: 1,
        send_shipping_notification: false,
        address_to: shippingAddress,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Printify create order failed: ${response.status} ${error}`);
  }

  return response.json();
}

export async function sendToProduction(orderId: string): Promise<void> {
  const shopId = getShopId();

  const response = await fetch(
    `${PRINTIFY_API_BASE}/shops/${shopId}/orders/${orderId}/send_to_production.json`,
    {
      method: "POST",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `Printify send to production failed: ${response.status} ${error}`
    );
  }
}

export async function getPrintifyProducts(): Promise<unknown[]> {
  const shopId = getShopId();

  const response = await fetch(
    `${PRINTIFY_API_BASE}/shops/${shopId}/products.json`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `Printify get products failed: ${response.status} ${error}`
    );
  }

  const data = await response.json();
  return data.data || [];
}
