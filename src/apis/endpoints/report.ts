export class ReportEndPoint {
  static getReport(reviewId: string) {
    return `/report/${reviewId}`;
  }

  static getReportList() {
    return "/report";
  }
}
