import { SearchCatalogues } from ".";
import { Popularcatalogue, catalogueIdeas } from "../utils/categories";

export default function Search() {
  return (
    <div className="flex justify-center overflow-y-scroll">
      <div className="bg-white h-[36rem] no-scrollbar w-4/6 rounded-b-2xl p-4 md:p-6 lg:p-8 overflow-y-scroll">
        <div>
          <p className="font-medium pb-4">Ideas for you</p>
          <div className="grid grid-cols-3 gap-4">
            {catalogueIdeas.map((catalogue) => (
              <SearchCatalogues
                key={catalogue.id}
                searchTerm={catalogue.searchTerm}
                imgUrl={catalogue.imgUrl}
              />
            ))}
          </div>
        </div>
        <div className="mt-8">
          <p className="font-medium pb-4">Popular on Pinterest</p>
          <div className="grid grid-cols-3 gap-4">
            {Popularcatalogue.map((catalogue) => (
              <SearchCatalogues
                key={catalogue.id}
                searchTerm={catalogue.searchTerm}
                imgUrl={catalogue.imgUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
