type NewStory = {
  title: string;
  summary: string;
  category?: string;
  passage: string;
};

declare interface UserPublicMetadata {
  profile_id: string;
}

type RefetchOptionsType<TPageData> = RefetchOptions &
  RefetchQueryFilters<TPageData>;
type QueryResultType = Promise<
  QueryObserverResult<AxiosResponse<any, any>, unknown>
>;

type RefetchFunctionType = <TPageData>(
  options?: RefetchOptionsType<TPageData>,
) => QueryResultType;
