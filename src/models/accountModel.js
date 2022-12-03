export default function AccountModel(props) {

    this.id = props.id || null;
    this.username = props.username || "";
    this.email = props.email || "";
    this.password = props.password || "";
    this.avatar = props.avatar || "";
}
