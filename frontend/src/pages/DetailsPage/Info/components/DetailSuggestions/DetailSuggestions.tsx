import type {RefObject} from 'react';
import {ProductSuggestion, type SuggestionItem} from '../ProductSuggestion/ProductSuggestion';

export type CarouselControls = Readonly<{
    translateValue: number;
    trackRef: RefObject<HTMLDivElement | null>;
    viewportRef: RefObject<HTMLDivElement | null>;
    prev: () => void;
    next: () => void;
}>;

type DetailSuggestionsProps = Readonly<{
    suggestions: SuggestionItem[];
    carousel: CarouselControls;
    getHref?: (id: number) => string;
    title?: string;
}>;

export default function DetailSuggestions({
    suggestions,
    carousel,
    getHref,
    title = 'SUGESTÕES',
}: DetailSuggestionsProps) {
    return (
        <div className="w-full px-10 mt-10 lg:mt-0 md:px-20 lg:px-40 xl:px-40 ">
            <h2 className="text-xl font-bold p-1 w-full">{title}</h2>
            <div className="border-t border-t-gray-300">
                <ProductSuggestion
                    products={suggestions}
                    translateValue={carousel.translateValue}
                    trackRef={carousel.trackRef}
                    viewportRef={carousel.viewportRef}
                    prev={carousel.prev}
                    next={carousel.next}
                    getHref={getHref}
                />
            </div>
        </div>
    );
}