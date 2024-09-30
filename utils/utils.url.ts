const removeQueryURL = (params: string[]) => {
  const url = new URL(location.href);

  // Iterate over the queryParams object and set each query parameter
  params.forEach(query => {
    url.searchParams.delete(query);
  });

  return url.toString();
};

const setQueryURL = (params: { [x: string]: string }, href?: string) => {
  const url = href?.length
    ? new URL(`${location.origin}/${href}`)
    : new URL(location.href);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
};

const setStateURL = ({
  data = null,
  unused = '',
  url,
}: {
  data?: Record<string, string | number> | null;
  unused?: string;
  url?: string | URL | null;
}) => {
  return history.pushState(data, unused, url);
};

const getLinkNFT = (nftContract: string, tokenId: string) => {
  return `/nft/${nftContract}:${tokenId}`;
};

const getLinkCollection = (key: string) => {
  return `/collection/${key}`;
};

export default {
  removeQueryURL,
  setQueryURL,
  setStateURL,
  getLinkNFT,
  getLinkCollection,
};
