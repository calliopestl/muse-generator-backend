module.exports = mongoose => {
    const Project = mongoose.model(
        "project",
        mongoose.Schema(
            {
                title: String, 
                generated: Array,
                notes: String
            }

        )
    );
    return Project;
}