export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyPrice;
  availableForSale: boolean;
  selectedOptions: ShopifySelectedOption[];
  image?: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  tags: string[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
  };
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  metafields?: {
    key: string;
    value: string;
  }[];
  comingSoon?: boolean;
}

export interface CartLineItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: ShopifyPrice;
    product: {
      title: string;
      handle: string;
      images: ShopifyImage[];
    };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: CartLineItem[];
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
  };
}

// Storefront API response shapes (edges/nodes)
export interface StorefrontProductEdge {
  node: {
    id: string;
    handle: string;
    title: string;
    description: string;
    descriptionHtml?: string;
    tags: string[];
    priceRange: {
      minVariantPrice: ShopifyPrice;
    };
    images: {
      edges: { node: ShopifyImage }[];
    };
    variants: {
      edges: { node: ShopifyVariant }[];
    };
    metafields?: ({
      key: string;
      value: string;
    } | null)[];
  };
}

export interface StorefrontCartResponse {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          price: ShopifyPrice;
          product: {
            title: string;
            handle: string;
            images: {
              edges: { node: ShopifyImage }[];
            };
          };
        };
      };
    }[];
  };
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
  };
}
