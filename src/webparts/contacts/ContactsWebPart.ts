import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'ContactsWebPartStrings';
import Contacts from './components/Contacts';
import { IContactsState } from './components/IContactsState';

export interface IContactsWebPartProps {
  description: string;
}

export default class ContactsWebPart extends BaseClientSideWebPart<IContactsWebPartProps> {

  public render(): void {
 /*   const element: React.ReactElement<IContactsState > = React.createElement(
      Contacts,
      {
        prop1: "this.properties.description"
      }
    );*/

  //  ReactDom.render(React.createElement(element, this.domElement);
    ReactDom.render(React.createElement(Contacts,
                                          {
                                            spHttpClient:this.context.spHttpClient,
                                            currentWebUrl:this.context.pageContext.web.absoluteUrl
                                                            }
                                                            ), this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
