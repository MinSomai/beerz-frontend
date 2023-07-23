// Why parser?
// - Parsers are good way to maintain consistency for third party API integration
// - Because if they change their API, we can modify parser and other things will work as expected
// - We can write test cases and catch incompatible API changes early on
//
// For first party integration, we don't have to write parsers
class PunkApiParser {
  parseBeersList(rawBeersList) {
    if (Array.isArray(rawBeersList)) {
      return rawBeersList
        .map((eachBeer) => {
          return this.parseSingleBeer(eachBeer) ?? null;
        })
        .filter(Boolean);
    }
    return [];
  }

  parseSingleBeer(rawBeer) {
    if (!rawBeer?.id) throw new Error("Invalid beer.");
    // the result
    const result = {
      id: null,
      name: null,
      genre: null,
      description: null,
      ingredients: null,
      imageURL: null,
    };

    result.id = rawBeer?.id;

    if (rawBeer?.name) result.name = rawBeer.name;
    if (rawBeer?.tagline) result.genre = rawBeer.tagline;
    if (rawBeer?.description) result.description = rawBeer.description;
    if (rawBeer?.image_url) result.imageURL = rawBeer.image_url;
    if (rawBeer?.ingredients) result.ingredients = this._parseIngredients(rawBeer.ingredients);

    // const allFieldsNull = Object.values(result).every((value) => value === null);
    // if (!allFieldsNull) return null;

    return result;
  }

  _parseIngredients(rawIngredients) {
    const ingregientsResult = new Set([]);
    Object.keys(rawIngredients).forEach((eachKey) => ingregientsResult.add(eachKey));
    return ingregientsResult;
  }
}

export default PunkApiParser;
