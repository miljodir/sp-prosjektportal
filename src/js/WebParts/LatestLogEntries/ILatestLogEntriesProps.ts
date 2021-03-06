import { ISecuredWebPartProps } from "../@SecuredWebPart";
import { PermissionKind } from "sp-pnp-js";

export default interface ILatestLogEntriesProps extends ISecuredWebPartProps {
    itemsCount?: number;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    reloadInterval?: number;
    listClassName?: string;
}

export const LatestLogEntriesDefaultProps: Partial<ILatestLogEntriesProps> = {
    itemsCount: 10,
    itemsOrderBy: {
        orderBy: "Created",
        ascending: false,
    },
    reloadInterval: -1,
    listClassName: "pp-simpleList spacing-m",
    permissionKind: PermissionKind.ManageWeb,
};
