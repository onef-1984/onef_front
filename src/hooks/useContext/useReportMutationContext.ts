import { CreateReportMutationVariables, UpdateReportMutationVariables } from "@/types/graphql.types";
import { createSafeContext } from "./createSafeContext";

export const { Provider: ReportMutateProvider, useContext: useReportMutateContext } = createSafeContext<
  | ((props: CreateReportMutationVariables["ReportInput"]) => void)
  | ((props: UpdateReportMutationVariables["ReportUpdateInput"]) => void)
>();
