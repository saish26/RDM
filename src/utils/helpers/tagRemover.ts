export function removeHtmlTags(input: any) {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
  }