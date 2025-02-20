import { Component, OnInit } from '@angular/core';
import { TallerService } from './taller.service';


import { RouterModule } from '@angular/router';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, MatListModule,MatIconModule,MatCardModule,RouterModule],
  templateUrl: './user-dashboard.component.html',
  
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  talleres: any[] = []; // Lista de talleres
  
  constructor(private tallerService: TallerService) {}

  ngOnInit(): void {
    this.cargarTalleres();
  }

  // Cargar todos los talleres
  cargarTalleres(): void {
    this.tallerService.getTalleres().subscribe(
      (data: any) => {
        this.talleres = data;
      },
      (error) => {
        console.error('Error al cargar talleres:', error);
      }
    );
  }
  
}
