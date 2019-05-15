import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { AppComponent } from './app.component';
import { EditorTextStyleBarComponent } from './editor/render-block/block-types/block-type-text/editor-text-style-bar/editor-text-style-bar.component';
import { EditorListComponent } from './editor/editor-list/editor-list.component';
import { RenderBlockComponent } from './editor/render-block/render-block.component';
import { BlockHostDirective } from './editor/block-host.directive';
import { BlockTypeTextComponent } from './editor/render-block/block-types/block-type-text/block-type-text.component';
import { AddingButtonComponent } from './editor/render-block/block-types/adding-button/adding-button.component';
import { BlockTypeHeaderComponent } from './editor/render-block/block-types/block-type-header/block-type-header.component';
import { FormsModule } from "@angular/forms";
import { InputFieldModule } from "./shared/input-field/input-field.module";
import { ListChangeDirective } from './editor/editor-list/list-change.directive';
import { BlockTypeCodeComponent } from './editor/render-block/block-types/block-type-code/block-type-code.component';
import { DeleteButtonComponent } from './editor/render-block/block-types/delete-button/delete-button.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorTextStyleBarComponent,
    EditorListComponent,
    RenderBlockComponent,
    BlockHostDirective,
    BlockTypeTextComponent,
    AddingButtonComponent,
    BlockTypeHeaderComponent,
    ListChangeDirective,
    BlockTypeCodeComponent,
    DeleteButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InputFieldModule,
    NgxDnDModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    BlockTypeTextComponent,
    BlockTypeHeaderComponent,
    BlockTypeCodeComponent
  ]
})
export class AppModule { }
