import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, Map, Marker, map, marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {

  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly DEFAULT_LATLANG: LatLngTuple = [12.9716, 77.5946];
  @ViewChild('map' , {static: true})  mapRef!: ElementRef;
  map!: Map;
  currentMarker!: Marker;
  @Input() order!: Order;
  @Input() readonly = false;
  constructor(private locationService: LocationService) { }

  ngOnChanges(): void {
    if(!this.order) return;
    this.initializeMap();
    if(this.readonly && this.addressLatLng) {
      this.showLocationOnReadOnlyMode();
    }
  }
  showLocationOnReadOnlyMode() {
    const map = this.map;
    this.setMarker(this.addressLatLng);
    map.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);
    map.dragging.disable();
    map.touchZoom.disable();
    map.boxZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.keyboard.disable();
    map.off('click');
    map.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  initializeMap() {
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement,  {
      attributionControl: false
    }).setView(this.DEFAULT_LATLANG, 1);
    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      }
    })
  }

  setMarker(latlng: LatLngExpression) {
    this.addressLatLng = latlng as LatLng;
    if(this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }
    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: L.divIcon({
        html: '<i class="fa fa-map-marker" style="color: red; font-size: 35px"></i>',
        iconSize: [20, 20],
        className: 'myDivIcon'
      })
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  set addressLatLng(latlng: LatLng){
    if(!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }

}
