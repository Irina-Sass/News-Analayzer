export class CommitCardList {
    constructor(container, createCard) {
        this.container = container;
        this.createCard = createCard;        
    }

    render(arrCards) {
        arrCards.forEach(element => {
            const card = this.createCard({
                name: element.commit.committer.name, 
                email: element.commit.committer.email,
                date: element.commit.committer.date,
                message: element.commit.message,
                avatarUrl: element.author.avatar_url
            });
            this.container.appendChild(card);           
        });
    }
}    