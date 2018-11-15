import { Component, OnInit, ViewChild } from "@angular/core";
import * as _ from "lodash";
import { VehiclesService } from "./service/vehicles.service";
import { OwnerDetailsBean } from "../beans/OwnerBean";
import { DataTableDirective } from "angular-datatables";


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.sass']
})
export class VehiclesComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  vehicles: OwnerDetailsBean[];

dtOptions: DataTables.Settings = {};
  constructor(private vehicleService: VehiclesService) {

   }

  ngOnInit() {
    console.log("Test");
    this.dtOptions = {
      columns: [
        {
          title: "Owner ID",
          data: "id"
        },
        {
          title: "Owner Name",
          data: "name"
        },
        {
          title: "Owner Address",
          data: "address"
        },
        {
          title: "Vehicle ID",
          data: "vehicleId"
        },
        {
          title: "Vehicle REG NO",
          data: "registrationNumber"
        },
        {
          title: "Vehicle Status",
          data: "status"
        }
      ],
      scrollX: true,
      language: {
        search: "Filter records:",
        lengthMenu: "_MENU_"
      }
    };
  
    this.vehicleService.getAllVehciles().subscribe(vehiclesList => {
if(vehiclesList!=undefined){
  this.vehicles = [];
  console.log(vehiclesList);
  console.log(vehiclesList.length);
  for(let owner of vehiclesList){
   if(owner.vehicles==undefined)
    continue;
    for(let veh of owner.vehicles){
      let vehicleDetailItem  = new OwnerDetailsBean();
      vehicleDetailItem.address = owner.address;
      vehicleDetailItem.id = owner.id;
      vehicleDetailItem.name = owner.name;
      vehicleDetailItem.registrationNumber = veh.registrationNumber;
      vehicleDetailItem.status = veh.status;
      vehicleDetailItem.vehicleId = veh.id;
      this.vehicles.push(vehicleDetailItem);
    }
  }
  // this.vehicles = vehiclesList;
  console.log(this.vehicles);
  console.log(this.dtElement);
  this.refreshTable();
}
else
console.log("No Vehicles Found");
    });
  
  }

  public refreshTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear();
      dtInstance.rows.add(this.vehicles);
      dtInstance.draw(true);
    });
  }
}
