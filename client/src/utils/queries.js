import { gql } from '@apollo/client';

export const QUERY_GIFTS = gql`
  query getGifts($category: ID) {
    gifts(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_ALL_GIFTS = gql`
  {
    gifts {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        gifts {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
