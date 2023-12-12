const new_data = []
const all_data = [...old_data, ...new_data]
const reverse_data = all_data.reverse()
const data_storage = {
    getAll: () => all_data,
    getNewestResults: (length, from = 0) => {
        const clone = [...reverse_data]
        clone.length = length + from
        const clone2 = clone.reverse()
        clone2.length = length
        clone2.reverse()
        return clone
    }
}
