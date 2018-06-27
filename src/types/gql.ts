/* tslint:disable */
import { GraphQLResolveInfo } from 'graphql';

type Resolver<Result, Args = any> = (
  parent: any,
  args: Args,
  context: any,
  info: GraphQLResolveInfo,
) => Promise<Result> | Result;

/** The `Naive DateTime` scalar type represents a naive date and time withouttimezone. The DateTime appears in a JSON response as an ISO8601 formattedstring. */
export type NaiveDateTime = any;

export interface RootQueryType {
  categories: Category[] /** Get all categories */;
  category: Category | null /** Get a single category by id or slug */;
  product: Product | null /** Get a single product by id or slug */;
  products: PagedProducts | null /** Get a paginated list of products */;
}

export interface Category {
  id: string;
  order: number;
  products: Product[];
  slug: string;
  term: string;
}

export interface Product {
  categories: Category[];
  createdAt: NaiveDateTime;
  description: string;
  featured: boolean;
  id: string;
  images: ProductImage[];
  listed: boolean;
  name: string;
  price: number;
  salePrice: number | null;
  sku: string;
  slug: string;
  stockQty: number | null;
  thumbnail: ProductImage | null;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface PagedProducts {
  items: Product[];
  pagination: Pagination;
}
/** Pagination information for a paged query */
export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalEntries: number;
  totalPages: number;
}

export interface RootMutationType {
  createProduct: CreateProductResponse | null;
}

export interface CreateProductResponse {
  errors: (Error | null)[] | null;
  product: Product | null;
}
/** A validation error */
export interface Error {
  key: string;
  reason: string;
}

export namespace RootQueryTypeResolvers {
  export interface Resolvers {
    categories?: CategoriesResolver /** Get all categories */;
    category?: CategoryResolver /** Get a single category by id or slug */;
    product?: ProductResolver /** Get a single product by id or slug */;
    products?: ProductsResolver /** Get a paginated list of products */;
  }

  export type CategoriesResolver = Resolver<Category[]>;
  export type CategoryResolver = Resolver<Category | null, CategoryArgs>;
  export interface CategoryArgs {
    id: string | null;
    slug: string | null;
  }

  export type ProductResolver = Resolver<Product | null, ProductArgs>;
  export interface ProductArgs {
    id: string | null;
    slug: string | null;
  }

  export type ProductsResolver = Resolver<PagedProducts | null, ProductsArgs>;
  export interface ProductsArgs {
    page: number | null;
  }
}

export namespace CategoryResolvers {
  export interface Resolvers {
    id?: IdResolver;
    order?: OrderResolver;
    products?: ProductsResolver;
    slug?: SlugResolver;
    term?: TermResolver;
  }

  export type IdResolver = Resolver<string>;
  export type OrderResolver = Resolver<number>;
  export type ProductsResolver = Resolver<Product[]>;
  export type SlugResolver = Resolver<string>;
  export type TermResolver = Resolver<string>;
}

export namespace ProductResolvers {
  export interface Resolvers {
    categories?: CategoriesResolver;
    createdAt?: CreatedAtResolver;
    description?: DescriptionResolver;
    featured?: FeaturedResolver;
    id?: IdResolver;
    images?: ImagesResolver;
    listed?: ListedResolver;
    name?: NameResolver;
    price?: PriceResolver;
    salePrice?: SalePriceResolver;
    sku?: SkuResolver;
    slug?: SlugResolver;
    stockQty?: StockQtyResolver;
    thumbnail?: ThumbnailResolver;
  }

  export type CategoriesResolver = Resolver<Category[]>;
  export type CreatedAtResolver = Resolver<NaiveDateTime>;
  export type DescriptionResolver = Resolver<string>;
  export type FeaturedResolver = Resolver<boolean>;
  export type IdResolver = Resolver<string>;
  export type ImagesResolver = Resolver<ProductImage[]>;
  export type ListedResolver = Resolver<boolean>;
  export type NameResolver = Resolver<string>;
  export type PriceResolver = Resolver<number>;
  export type SalePriceResolver = Resolver<number | null>;
  export type SkuResolver = Resolver<string>;
  export type SlugResolver = Resolver<string>;
  export type StockQtyResolver = Resolver<number | null>;
  export type ThumbnailResolver = Resolver<ProductImage | null>;
}

export namespace ProductImageResolvers {
  export interface Resolvers {
    id?: IdResolver;
    url?: UrlResolver;
  }

  export type IdResolver = Resolver<string>;
  export type UrlResolver = Resolver<string>;
}

export namespace PagedProductsResolvers {
  export interface Resolvers {
    items?: ItemsResolver;
    pagination?: PaginationResolver;
  }

  export type ItemsResolver = Resolver<Product[]>;
  export type PaginationResolver = Resolver<Pagination>;
}
/** Pagination information for a paged query */
export namespace PaginationResolvers {
  export interface Resolvers {
    pageNumber?: PageNumberResolver;
    pageSize?: PageSizeResolver;
    totalEntries?: TotalEntriesResolver;
    totalPages?: TotalPagesResolver;
  }

  export type PageNumberResolver = Resolver<number>;
  export type PageSizeResolver = Resolver<number>;
  export type TotalEntriesResolver = Resolver<number>;
  export type TotalPagesResolver = Resolver<number>;
}

export namespace RootMutationTypeResolvers {
  export interface Resolvers {
    createProduct?: CreateProductResolver;
  }

  export type CreateProductResolver = Resolver<
    CreateProductResponse | null,
    CreateProductArgs
  >;
  export interface CreateProductArgs {
    description: string;
    featured: boolean | null;
    listed: boolean | null;
    name: string;
    price: number;
    salePrice: number | null;
    sku: string;
    slug: string;
    stockQty: number | null;
  }
}

export namespace CreateProductResponseResolvers {
  export interface Resolvers {
    errors?: ErrorsResolver;
    product?: ProductResolver;
  }

  export type ErrorsResolver = Resolver<(Error | null)[] | null>;
  export type ProductResolver = Resolver<Product | null>;
}
/** A validation error */
export namespace ErrorResolvers {
  export interface Resolvers {
    key?: KeyResolver;
    reason?: ReasonResolver;
  }

  export type KeyResolver = Resolver<string>;
  export type ReasonResolver = Resolver<string>;
}
export interface CategoryRootQueryTypeArgs {
  id: string | null;
  slug: string | null;
}
export interface ProductRootQueryTypeArgs {
  id: string | null;
  slug: string | null;
}
export interface ProductsRootQueryTypeArgs {
  page: number | null;
}
export interface CreateProductRootMutationTypeArgs {
  description: string;
  featured: boolean | null;
  listed: boolean | null;
  name: string;
  price: number;
  salePrice: number | null;
  sku: string;
  slug: string;
  stockQty: number | null;
}
