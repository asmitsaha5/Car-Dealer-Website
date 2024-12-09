#include <stdio.h>
#include <string.h>

struct book
{
    char title[20];
    char author[20];
    char publication[20];
    char price[20];
};

int main()
{
    int n = 0;

    printf("Enter the number of books: ");
    scanf("%d", &n);

    struct book books[n];

    for (int i = 0; i < n; i++)
    {
        printf("Title: ");
        scanf("%s", books[i].title);

        printf("Author: ");
        scanf("%s", books[i].author);

        printf("Publication: ");
        scanf("%s", books[i].publication);

        printf("Price: ");
        scanf("%s", books[i].price);
    }

    char name[20];
    printf("\nFind author by name! ");
    printf("\nAuthor: ");
    scanf("%s", name);

    for (int i = 0; i < n; i++)
    {
        if (strcmp(books[i].author, name) == 0)
        {
            printf("\nFound\n");
            printf("Title: %s\n", books[i].title);
            printf("Author: %s\n", books[i].author);
            printf("Publication: %s\n", books[i].publication);
            printf("Price: %s\n", books[i].price);
        }
    }
}
