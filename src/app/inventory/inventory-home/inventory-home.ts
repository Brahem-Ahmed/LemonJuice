import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inventory-home',
  imports: [MatToolbar, MatButton, MatIcon, RouterLink, RouterOutlet],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <span class="title">Inventory Dashboard</span>
      <div class="nav-buttons">
        <a mat-raised-button color="accent" routerLink="/inventory/stock-entry" class="nav-button">
          <mat-icon>input</mat-icon>
          <span class="button-text">Stock Entry</span>
        </a>
        <a mat-raised-button color="accent" routerLink="/inventory/products" class="nav-button">
          <mat-icon>inventory_2</mat-icon>
          <span class="button-text">Products</span>
        </a>
        <a mat-raised-button color="accent" routerLink="/inventory/categories" class="nav-button">
          <mat-icon>category</mat-icon>
          <span class="button-text">Categories</span>
        </a>
        <a mat-raised-button color="accent" routerLink="/inventory/reports" class="nav-button">
          <mat-icon>assessment</mat-icon>
          <span class="button-text">Reports</span>
        </a>
      </div>
    </mat-toolbar>

    <div class="content-container">
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <h3>Inventory Actions</h3>
          <div class="action-buttons">
            <button mat-raised-button color="primary" class="action-btn">
              <mat-icon>add_circle</mat-icon>
              Add New Product
            </button>
            <button mat-raised-button color="primary" class="action-btn">
              <mat-icon>update</mat-icon>
              Stock Adjustment
            </button>
            <button mat-raised-button color="primary" class="action-btn">
              <mat-icon>search</mat-icon>
              Low Stock Alert
            </button>
            <button mat-raised-button color="primary" class="action-btn">
              <mat-icon>print</mat-icon>
              Generate Report
            </button>
          </div>
        </div>

        <div class="dashboard-card">
          <h3>Inventory Overview</h3>
          <div class="stats-container">
            <div class="stat-item">
              <span class="stat-number">1,234</span>
              <span class="stat-label">Total Products</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">42</span>
              <span class="stat-label">Low Stock Items</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">15</span>
              <span class="stat-label">Categories</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">$125,890</span>
              <span class="stat-label">Total Value</span>
            </div>
          </div>
        </div>

        <div class="dashboard-card">
          <h3>Recent Activity</h3>
          <div class="activity-list">
            <div class="activity-item">
              <mat-icon class="activity-icon">add</mat-icon>
              <span class="activity-text">Added 50 units of Product A</span>
              <span class="activity-time">2 hours ago</span>
            </div>
            <div class="activity-item">
              <mat-icon class="activity-icon">remove</mat-icon>
              <span class="activity-text">Sold 25 units of Product B</span>
              <span class="activity-time">3 hours ago</span>
            </div>
            <div class="activity-item">
              <mat-icon class="activity-icon">warning</mat-icon>
              <span class="activity-text">Low stock alert: Product C</span>
              <span class="activity-time">5 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
  styles: `
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .title {
      font-size: 1.5rem;
      font-weight: 500;
      flex: 1;
    }

    .nav-buttons {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .nav-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      transition: all 0.3s ease;
    }

    .nav-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .content-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .dashboard-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    }

    .dashboard-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .dashboard-card h3 {
      margin: 0 0 20px 0;
      color: #333;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .action-btn {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 12px 16px;
      text-align: left;
      transition: all 0.3s ease;
    }

    .action-btn:hover {
      transform: translateX(4px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .stats-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }

    .stat-item:hover {
      background: #e8f5e8;
    }

    .stat-number {
      font-size: 1.75rem;
      font-weight: bold;
      color: #4caf50;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #666;
      text-align: right;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #fafafa;
      border-radius: 8px;
      border-left: 4px solid #2196f3;
      transition: all 0.3s ease;
    }

    .activity-item:hover {
      background: #f0f0f0;
      transform: translateX(4px);
    }

    .activity-icon {
      color: #2196f3;
      font-size: 20px;
    }

    .activity-text {
      flex: 1;
      font-size: 0.875rem;
      color: #333;
    }

    .activity-time {
      font-size: 0.75rem;
      color: #666;
    }

    /* Tablet and smaller screens */
    @media (max-width: 1024px) {
      .nav-buttons {
        gap: 8px;
      }

      .nav-button {
        padding: 6px 12px;
        font-size: 0.875rem;
      }

      .nav-button mat-icon {
        margin-right: 4px;
      }
    }

    /* Mobile screens */
    @media (max-width: 768px) {
      .toolbar {
        flex-direction: column;
        gap: 12px;
        padding: 12px 16px;
        min-height: auto;
      }

      .title {
        font-size: 1.25rem;
        text-align: center;
        margin-bottom: 8px;
      }

      .nav-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        width: 100%;
      }

      .nav-button {
        justify-content: center;
        padding: 8px 12px;
        font-size: 0.75rem;
        min-height: 36px;
      }

      .dashboard-grid {
        grid-template-columns: 1fr;
      }

      .content-container {
        padding: 16px;
        margin-top: 120px;
      }
    }

    /* Very small screens */
    @media (max-width: 480px) {
      .toolbar {
        padding: 8px 12px;
      }

      .title {
        font-size: 1.1rem;
      }

      .nav-buttons {
        grid-template-columns: 1fr;
        gap: 6px;
      }

      .nav-button {
        padding: 10px 16px;
        font-size: 0.875rem;
        width: 100%;
      }

      .nav-button .button-text {
        display: none;
      }

      .content-container {
        padding: 12px;
        margin-top: 200px;
      }

      .dashboard-card {
        padding: 16px;
      }

      .action-btn {
        padding: 10px 12px;
        font-size: 0.875rem;
      }
    }

    /* Extra small screens - icon only buttons */
    @media (max-width: 360px) {
      .nav-button {
        padding: 8px;
        min-width: 40px;
      }

      .nav-button mat-icon {
        margin: 0;
      }
    }
  `,
})
export class InventoryHome {}
