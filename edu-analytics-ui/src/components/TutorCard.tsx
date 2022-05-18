interface TutorCard {
    thumbNail: string,
    caption: string,
    avatar: string,
}

const TutorCard: React.FunctionComponent<TutorCard> = ({ thumbNail, caption, avatar }) => {
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={thumbNail} alt="Shoes" /></figure>
            <div className="card-body">
                <p>{caption}</p>
            </div>
            <div>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={avatar} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TutorCard;