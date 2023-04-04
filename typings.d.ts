interface SanityBody {
  _createAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface Page extends SanityBody {
  _type: "page";
  heroHeading: string;
  heroImage: Image;
  noFeesTitle: string;
  noFeesDescription: string;
}

export interface MiniCase extends SanityBody {
  _type: "miniCase";
  title: string;
  description: string;
  image: Image;
}

export interface UseCase extends SanityBody {
  _type: "useCase";
  title: string;
  description: string;
  image: Image;
}

export interface Translations {
  [key: string]: string;
}

export interface Locales {
  en: object;
  ru: object;
  ka: object;
}

export interface User {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}
