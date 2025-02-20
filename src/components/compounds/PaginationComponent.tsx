import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        {/* Botão de página anterior */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            Anterior
          </PaginationPrevious>
        </PaginationItem>

        {/* Página anterior */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage - 1);
              }}
            >
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Página atual */}
        <PaginationItem>
          <PaginationLink href="#" className="font-bold">
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {/* Próxima página */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
              }}
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Botão de próxima página */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            Próximo
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
