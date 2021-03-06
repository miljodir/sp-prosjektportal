import RESOURCE_MANAGER from "localization";
import { IModalLinkProps } from "../@Components/ModalLink";
import {PermissionKind} from "sp-pnp-js";
import {
    SetMetadataDefaultsForLibrary,
    EnsureLocationBasedMetadataDefaultsReceiverForLibrary,
} from "../../Project";

const ProjectInfoDefaultActionLinks: IModalLinkProps[] = [{
    url: `${_spPageContextInfo.webAbsoluteUrl}/SitePages/Forms/DispForm.aspx?ID=3`,
    label: RESOURCE_MANAGER.getResource("ProjectInfo_ViewProperties"),
    icon: { iconName: "PreviewLink" },
    options: {
        HideContentTypeChoice: true,
        HideWebPartMaintenancePageLink: true,
        HideRibbon: true,
    },
    reloadOnSubmit: false,
    showLabel: true,
},
{
    url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/versions.aspx?list=${_spPageContextInfo.pageListId}&ID=${_spPageContextInfo.pageItemId}&FileName=${_spPageContextInfo.serverRequestPath}`,
    label: RESOURCE_MANAGER.getResource("ProjectInfo_ShowVersionHistory"),
    icon: { iconName: "History" },
    options: {
        HideRibbon: true,
    },
    reloadOnSubmit: false,
    showLabel: true,
    permissionKind: PermissionKind.ManageWeb,
},
{
    url: `${_spPageContextInfo.webAbsoluteUrl}/SitePages/Forms/EditForm.aspx?ID=3`,
    label: RESOURCE_MANAGER.getResource("ProjectInfo_EditProperties"),
    icon: { iconName: "EditMirrored" },
    options: {
        HideContentTypeChoice: true,
        HideWebPartMaintenancePageLink: true,
        HideRibbon: true,
        HideFormFields: "GtProjectPhase",
    },
    onDialogReturnValueCallback: result => {
        Promise.all([
            SetMetadataDefaultsForLibrary([{
                fieldName: "GtProjectPhase",
                fieldType: "Taxonomy",
            },
            {
                fieldName: "GtProjectType",
                fieldType: "TaxonomyMulti",
            },
            {
                fieldName: "GtProjectServiceArea",
                fieldType: "TaxonomyMulti",
            },
            {
                fieldName: "GtProjectFinanceName",
                fieldType: "Text",
            },
            {
                fieldName: "GtProjectNumber",
                fieldType: "Text",
            },
            {
                fieldName: "GtArchiveReference",
                fieldType: "Text",
            }]),
            EnsureLocationBasedMetadataDefaultsReceiverForLibrary(),
        ])
            .then(() => {
                SP.Utilities.HttpUtility.navigateTo(_spPageContextInfo.serverRequestPath);
            })
            .catch(() => {
                SP.Utilities.HttpUtility.navigateTo(_spPageContextInfo.serverRequestPath);
            });
    },
    showLabel: true,
    permissionKind: PermissionKind.ManageWeb,
},
{
    url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/15/prjsetng.aspx`,
    label: RESOURCE_MANAGER.getResource("ProjectInfo_EditLogo"),
    icon: { iconName: "AppIconDefault" },
    showLabel: true,
    permissionKind: PermissionKind.ManageWeb,
}];

export default ProjectInfoDefaultActionLinks;
