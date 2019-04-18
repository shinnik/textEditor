import { Component, OnInit, ViewChild, Input, ComponentFactoryResolver } from '@angular/core';
import {BlockHostDirective} from '../block-host.directive';
import {IBlock, IBlockTypes} from '../models';
import {BlockTypeTextComponent} from "./block-types/block-type-text/block-type-text.component";
import {detectBufferEncoding} from "tslint/lib/utils";
import {BlockTypeHeaderComponent} from "./block-types/block-type-header/block-type-header.component";
import {BlockTypeCodeComponent} from "./block-types/block-type-code/block-type-code.component";

@Component({
  selector: 'app-render-block',
  templateUrl: './render-block.component.html',
  styleUrls: ['./render-block.component.css']
})
export class RenderBlockComponent implements OnInit {

  BLOCK_TYPES_DICT = {
    [IBlockTypes.TEXTBOX]: BlockTypeTextComponent,
    [IBlockTypes.HEADER]: BlockTypeHeaderComponent,
    [IBlockTypes.CODE]: BlockTypeCodeComponent,
  };

  @Input() block: IBlock;
  @ViewChild(BlockHostDirective) blockHost: BlockHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.renderBlock();
  }

  renderBlock() {
    const blockComponent = this.BLOCK_TYPES_DICT[this.block.type];
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory<BlockTypeTextComponent>(blockComponent);

    const viewContainerRef = this.blockHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    const component = <BlockTypeTextComponent>componentRef.instance;
    component.content = this.block.content;
    component.id = this.block.id;
  }
}
